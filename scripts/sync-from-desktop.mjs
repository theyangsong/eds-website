/**
 * Sync @eds/desktop-components + showcase previews → website (8px scale base).
 * Layout px in showcase are NOT doubled — Website tokens (scaleBase 8) already map
 * semantic spacing/icon vars to the correct pixels when components use var(--spacing-*).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DESKTOP = join(ROOT, '..', 'eds-desktop');

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    if (name.name === 'node_modules' || name.name === 'dist') continue;
    if (name.isDirectory()) walk(path, files);
    else if (/\.(vue|ts|tsx|css|mjs|json)$/.test(name.name)) files.push(path);
  }
  return files;
}

/**
 * Desktop 4px 网格 spacing 名 → Website 8px 网格降一档（同像素意图）。
 * 例：desktop spacing-1 (4px) → website spacing-05 (4px)。
 */
const SPACING_DESKTOP_TO_WEBSITE = {
  spacing-12: 'spacing-6',
  spacing-10: 'spacing-5',
  spacing-8: 'spacing-4',
  spacing-7: 'spacing-4',
  spacing-6: 'spacing-3',
  spacing-5: 'spacing-2-5',
  spacing-4: 'spacing-2',
  spacing-3: 'spacing-1-5',
  spacing-2-5: 'spacing-1-5',
  spacing-2: 'spacing-1',
  spacing-1-5: 'spacing-1',
  spacing-1: 'spacing-05',
  spacing-05: 'spacing-025',
  'spacing-0-5': 'spacing-025',
  spacing-0: 'spacing-0',
};

function adaptWebsiteSpacing(content) {
  const keys = Object.keys(SPACING_DESKTOP_TO_WEBSITE).sort(
    (a, b) => b.length - a.length,
  );
  let out = content;
  for (const key of keys) {
    const suffix = key.slice('spacing-'.length);
    const mapped = SPACING_DESKTOP_TO_WEBSITE[key].slice('spacing-'.length);
    const escaped = suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(--spacing-)${escaped}(?![0-9-])`, 'g');
    out = out.replace(re, `$1${mapped}`);
  }
  return out;
}

function adaptScalePx(content) {
  let out = content;

  // Package / scope renames
  out = out
    .replace(/@eds\/desktop-components/g, '@eds/website-components')
    .replace(/@eds\/desktop-tokens/g, '@eds/website-tokens')
    .replace(/@eds\/desktop-animations/g, '@eds/website-animations')
    .replace(/desktopTokens/g, 'showcaseTokens')
    .replace(/desktop-components-scope\.css/g, 'showcase-components-scope.css')
    .replace(/initEdsDesktopRuntime/g, 'initEdsWebsiteRuntime')
    .replace(/EDS Desktop/g, 'EDS Website');

  // Website default control typography (Figma Website Body/Small)
  out = out
    .replace(/eds-body-medium-strong/g, 'eds-body-small-strong')
    .replace(/eds-body-medium/g, 'eds-body-small')
    .replace(/size-body-medium-strong/g, 'size-body-small-strong')
    .replace(/size-body-medium/g, 'size-body-small')
    .replace(/line-height-body-medium-strong/g, 'line-height-body-small-strong')
    .replace(/line-height-body-medium/g, 'line-height-body-small');

  out = adaptWebsiteSpacing(out);

  return out;
}

function syncDir(src, dest, { exclude = [] } = {}) {
  if (!existsSync(src)) {
    console.warn(`Skip missing: ${src}`);
    return;
  }
  mkdirSync(dest, { recursive: true });
  for (const name of readdirSync(src, { withFileTypes: true })) {
    if (exclude.includes(name.name)) continue;
    const from = join(src, name.name);
    const to = join(dest, name.name);
    if (name.isDirectory()) {
      syncDir(from, to, { exclude });
    } else {
      cpSync(from, to, { force: true });
    }
  }
}

function transformTree(dir) {
  for (const file of walk(dir)) {
    const raw = readFileSync(file, 'utf-8');
    const next = adaptScalePx(raw);
    if (next !== raw) writeFileSync(file, next);
  }
}

console.log('→ Sync animations package');
const animSrc = join(DESKTOP, 'packages/animations');
const animDest = join(ROOT, 'packages/animations');
if (existsSync(animDest)) rmSync(animDest, { recursive: true, force: true });
cpSync(animSrc, animDest, { recursive: true, filter: (src) => !src.includes('node_modules') && !src.includes('/dist/') });
writeFileSync(
  join(animDest, 'package.json'),
  readFileSync(join(animDest, 'package.json'), 'utf-8')
    .replace('@eds/desktop-animations', '@eds/website-animations')
    .replace('EverGreen Design System (Desktop)', 'EverGreen Design System (Website)'),
);

console.log('→ Sync components src (atoms, molecules, organisms, templates, pages, utils)');
const compSrc = join(DESKTOP, 'packages/components/src');
const compDest = join(ROOT, 'packages/components/src');
const compExclude = ['setup', 'env.d.ts', 'index.ts', 'styles/global.css'];
const MOLECULE_SKIP = new Set(['toggle', 'index.ts']); // toggle: Website toggle_*; index.ts: written separately
/** Website 8px scale — keep Figma Website spacing in these CSS modules (do not overwrite from Desktop). */
const MOLECULE_CSS_SKIP: Record<string, string[]> = {
  input: ['Input.module.css'],
  search: ['Search.module.css'],
  textarea: ['Textarea.module.css'],
  'verify-input': ['VerifyInput.module.css'],
  button: ['Button.module.css'],
  tab: ['Tab.module.css'],
  link: ['Link.module.css'],
  tag: ['Tag.module.css'],
};
for (const folder of ['atoms', 'molecules', 'organisms', 'templates', 'pages', 'utils', 'presets']) {
  if (folder === 'molecules') {
    for (const name of readdirSync(join(compSrc, 'molecules'))) {
      if (MOLECULE_SKIP.has(name)) continue;
      syncDir(join(compSrc, 'molecules', name), join(compDest, 'molecules', name), {
        exclude: MOLECULE_CSS_SKIP[name] ?? [],
      });
    }
  } else {
    syncDir(join(compSrc, folder), join(compDest, folder), { exclude: compExclude });
  }
}
// composables - merge
// Copy missing shared folder from desktop components
  syncDir(join(compSrc, 'shared'), join(compDest, 'shared'));

  // Showcase data helpers
  cpSync(
    join(DESKTOP, 'apps/showcase/src/data/catalogNavigation.ts'),
    join(ROOT, 'apps/showcase/src/data/catalogNavigation.ts'),
    { force: true },
  );
  syncDir(join(DESKTOP, 'apps/showcase/src/views/scenes/previews'), join(ROOT, 'apps/showcase/src/views/scenes/previews'));
  cpSync(join(DESKTOP, 'apps/showcase/src/data/scenes/catalog.ts'), join(ROOT, 'apps/showcase/src/data/scenes/catalog.ts'), { force: true });
  cpSync(join(DESKTOP, 'apps/showcase/src/data/scenes/navigation.ts'), join(ROOT, 'apps/showcase/src/data/scenes/navigation.ts'), { force: true });
  cpSync(join(DESKTOP, 'apps/showcase/src/data/scenes/anchors.ts'), join(ROOT, 'apps/showcase/src/data/scenes/anchors.ts'), { force: true });
  cpSync(join(DESKTOP, 'apps/showcase/src/data/scenes/index.ts'), join(ROOT, 'apps/showcase/src/data/scenes/index.ts'), { force: true });

console.log('→ Sync showcase previews + presets + shared icons');
syncDir(join(DESKTOP, 'apps/showcase/src/views/components/previews'), join(ROOT, 'apps/showcase/src/views/components/previews'));
cpSync(
  join(DESKTOP, 'apps/showcase/src/views/shared/showcaseIcons.ts'),
  join(ROOT, 'apps/showcase/src/views/shared/showcaseIcons.ts'),
  { force: true },
);
syncDir(join(DESKTOP, 'apps/showcase/src/presets'), join(ROOT, 'apps/showcase/src/presets'));

console.log('→ Sync showcase shell layout (Desktop preview station parity)');
const showcaseShellCopies = [
  ['src/layout/ShowcaseLayout.module.css', 'src/layout/ShowcaseLayout.module.css'],
  ['src/layout/buildComponentsSidebarSections.ts', 'src/layout/buildComponentsSidebarSections.ts'],
  ['src/composables/useShowcaseContentTheme.ts', 'src/composables/useShowcaseContentTheme.ts'],
  ['src/composables/scrollContainment.ts', 'src/composables/scrollContainment.ts'],
  ['src/components/shared/ThemeToggle.vue', 'src/components/shared/ThemeToggle.vue'],
  ['src/components/shared/PageHeader.vue', 'src/components/shared/PageHeader.vue'],
  ['src/components/shared/PageHeader.module.css', 'src/components/shared/PageHeader.module.css'],
  ['src/components/shared/PageAnchors.vue', 'src/components/shared/PageAnchors.vue'],
  ['src/components/shared/PageAnchors.module.css', 'src/components/shared/PageAnchors.module.css'],
  ['src/components/shared/ComponentsPageAnchors.vue', 'src/components/shared/ComponentsPageAnchors.vue'],
  ['src/components/shared/CatalogPageAnchors.vue', 'src/components/shared/CatalogPageAnchors.vue'],
  ['src/views/components/ComponentsView.vue', 'src/views/components/ComponentsView.vue'],
  ['src/views/components/ComponentsView.module.css', 'src/views/components/ComponentsView.module.css'],
  ['src/views/shared/showcase.module.css', 'src/views/shared/showcase.module.css'],
  ['src/views/shared/componentDoc/ComponentDocLayout.vue', 'src/views/shared/componentDoc/ComponentDocLayout.vue'],
  ['src/views/shared/componentDoc/ComponentDocLayout.module.css', 'src/views/shared/componentDoc/ComponentDocLayout.module.css'],
];
for (const [from, to] of showcaseShellCopies) {
  const src = join(DESKTOP, 'apps/showcase', from);
  const dest = join(ROOT, 'apps/showcase', to);
  if (!existsSync(src)) continue;
  cpSync(src, dest, { force: true });
  let text = readFileSync(dest, 'utf-8');
  text = adaptScalePx(text)
    .replace(/desktop-components-scope\.css/g, 'showcase-components-scope.css')
    .replace(/desktopTokens/g, 'showcaseTokens');
  writeFileSync(dest, text);
}

console.log('→ Transform imports + scale px');
transformTree(join(ROOT, 'packages/components/src'));
transformTree(join(ROOT, 'packages/animations/src'));
transformTree(join(ROOT, 'apps/showcase/src/views/components/previews'));
transformTree(join(ROOT, 'apps/showcase/src/views/scenes/previews'));
transformTree(join(ROOT, 'apps/showcase/src/presets'));

// components package.json — add animations dep
const compPkgPath = join(ROOT, 'packages/components/package.json');
const compPkg = JSON.parse(readFileSync(compPkgPath, 'utf-8'));
compPkg.dependencies = {
  '@eds/website-tokens': 'workspace:*',
  '@eds/website-animations': 'workspace:*',
};
writeFileSync(compPkgPath, `${JSON.stringify(compPkg, null, 2)}\n`);

// molecules/index — Website toggle exports + desktop molecules barrel
const desktopMoleculesIndex = adaptScalePx(readFileSync(join(compSrc, 'molecules/index.ts'), 'utf-8'));
writeFileSync(
  join(compDest, 'molecules/index.ts'),
  desktopMoleculesIndex
    .replace(/export \* from '\.\/toggle';\n/, '')
    .replace(
      "export * from './input';\n",
      "export { EgSwitch, EgCheckbox, EgRadio, EgDecide } from './toggle';\nexport type { SwitchSize } from './switch';\nexport type { ToggleControlSize } from '../utils/toggleVariantName';\n\nexport { EgInput } from './input';\nexport type { InputType, InputSize, InputWidthMode, InputControlType } from './input';\n\nexport * from './menu-box';\n",
    ),
);

cpSync(join(compSrc, 'organisms/index.ts'), join(compDest, 'organisms/index.ts'), { force: true });
cpSync(join(compSrc, 'atoms/index.ts'), join(compDest, 'atoms/index.ts'), { force: true });
cpSync(join(compSrc, 'templates/index.ts'), join(compDest, 'templates/index.ts'), { force: true });
cpSync(join(compSrc, 'pages/index.ts'), join(compDest, 'pages/index.ts'), { force: true });
let indexFiles = walk(compDest).filter((f) => f.endsWith('index.ts'));
for (const f of indexFiles) {
  writeFileSync(f, adaptScalePx(readFileSync(f, 'utf-8')));
}

// components index.ts — merge exports from desktop
const desktopIndex = adaptScalePx(readFileSync(join(compSrc, 'index.ts'), 'utf-8'));
const websiteIndex = readFileSync(join(compDest, 'index.ts'), 'utf-8');
if (!websiteIndex.includes('initEdsWebsiteRuntime')) {
  writeFileSync(
    join(compDest, 'index.ts'),
    desktopIndex
      .replace(/initEdsDesktopRuntime/g, 'initEdsWebsiteRuntime')
      .replace(/from '\.\/setup\/initEdsDesktopRuntime'/g, "from './setup/initEdsWebsiteRuntime'"),
  );
}

// vite config external for animations
const viteCfg = readFileSync(join(ROOT, 'packages/components/vite.config.ts'), 'utf-8');
if (!viteCfg.includes('website-animations')) {
  writeFileSync(
    join(ROOT, 'packages/components/vite.config.ts'),
    viteCfg.replace(
      "external: ['vue', '@eds/website-tokens/corner-smoothing']",
      "external: ['vue', '@eds/website-tokens/corner-smoothing', '@eds/website-animations']",
    ),
  );
}

console.log('✓ Desktop → Website sync complete');

// Showcase doc defaults ↔ component API (Figma props)
const showcaseDocFixes = [
  {
    path: join(ROOT, 'apps/showcase/src/views/components/previews/buttonDocCustomize.ts'),
    replacements: [
      ["kind: 'button',\n  event: 'full' as BorderArrowDocEvent,\n  tone: 'brand',", "kind: 'number',\n  event: 'full' as BorderArrowDocEvent,\n  tone: 'decor',"],
    ],
  },
  {
    path: join(ROOT, 'apps/showcase/src/views/components/previews/inputDocCustomize.ts'),
    replacements: [
      ['feedback: true,', 'feedback: false,'],
      [
        "export const inputCustomizeDefaults = {\n  type: 'standard',\n  interaction: 'full',\n  size: 'md',\n  widthMode: 'full',",
        "export const inputCustomizeDefaults = {\n  type: 'standard',\n  interaction: 'full',\n  size: 'md',\n  widthMode: 'fixed',",
      ],
      [
        "export const textareaCustomizeDefaults = {\n  placeholder: '请输入',\n  widthMode: 'full',",
        "export const textareaCustomizeDefaults = {\n  placeholder: '请输入',\n  widthMode: 'fixed',",
      ],
      [
        "export const searchCustomizeDefaults = {\n  placeholder: 'Search',\n  widthMode: 'full',",
        "export const searchCustomizeDefaults = {\n  placeholder: 'Search',\n  widthMode: 'fixed',",
      ],
      [
        "export const verifyInputCustomizeDefaults = {\n  widthMode: 'full',",
        "export const verifyInputCustomizeDefaults = {\n  widthMode: 'fixed',",
      ],
    ],
  },
  {
    path: join(ROOT, 'apps/showcase/src/views/components/previews/inputSubPreviewData.ts'),
    replacements: [['defaultValue: \'true\'', 'defaultValue: \'false\'']],
  },
  {
    path: join(ROOT, 'apps/showcase/src/views/components/previews/toggleDocCustomize.ts'),
    replacements: [["defaultValue: \"'default'\"", "defaultValue: '-'"]],
  },
  {
    path: join(ROOT, 'apps/showcase/src/views/components/previews/feedbackDocCustomize.ts'),
    replacements: [
      [
        "name: 'focused',\n    type: 'boolean',\n    defaultValue: 'false',",
        "name: 'focused',\n    type: 'boolean',\n    defaultValue: '-',",
      ],
    ],
  },
];

for (const { path, replacements } of showcaseDocFixes) {
  if (!existsSync(path)) continue;
  let text = readFileSync(path, 'utf-8');
  for (const [from, to] of replacements) {
    if (text.includes(from)) text = text.replace(from, to);
  }
  writeFileSync(path, text);
}
