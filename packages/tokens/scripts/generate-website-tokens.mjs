#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const specDir = join(__dirname, '../spec');
const FIGMA_URL =
  'https://www.figma.com/design/RSjA0dgInAwyPjE1MIinH7/EverGreen-Design-System--WebSite-?node-id=2-22945';

/** Color base/semantic: edit spec/color/*.json (aligned with Desktop Color System). This script’s embedded color arrays are legacy; do not overwrite spec without syncing Desktop. */

function p3ToHex([r, g, b]) {
  const to255 = (v) => Math.round(Math.max(0, Math.min(1, v)) * 255);
  const hex = (n) => n.toString(16).padStart(2, '0');
  return `#${hex(to255(r))}${hex(to255(g))}${hex(to255(b))}`;
}

function parseP3(text) {
  const match = text.match(/display-p3\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!match) return null;
  const displayP3 = match.slice(1, 4).map(Number);
  return { hex: p3ToHex(displayP3), displayP3 };
}

function formatColorBaseJson(spec) {
  const formatPalette = (palette) =>
    Object.entries(palette)
      .map(
        ([name, { hex, displayP3 }]) =>
          `    "${name}": { "hex": "${hex}", "displayP3": [${displayP3.join(', ')}] }`,
      )
      .join(',\n');

  return `${JSON.stringify(
    {
      $schema: spec.$schema,
      $figma: spec.$figma,
      $description: spec.$description,
    },
    null,
    2,
  ).slice(0, -2)},
  "light": {
${formatPalette(spec.light)}
  },
  "dark": {
${formatPalette(spec.dark)}
  }
}
`;
}

const colorNames = [
  'eds-brand',
  'eds-match',
  'eds-decor',
  'eds-success',
  'eds-danger',
  'eds-warning',
  'eds-base',
  'eds-face',
  'eds-same-black',
  'eds-same-white',
  'eds-container',
  'eds-menu',
  'eds-page',
  'eds-popup',
  'eds-flotation',
  'eds-inner-glow',
  'eds-vulvar-glow',
  'eds-data-table',
  'eds-module-stroke',
];

const lightP3 = [
  'display-p3 .0000 .4275 .2549',
  'display-p3 0 .2275 .4275',
  'display-p3 .0078 .1765 .0510',
  'display-p3 .1216 .7647 .3529',
  'display-p3 .8431 .2745 .1765',
  'display-p3 .9216 .5686 .0784',
  'display-p3 .0078 .0118 .0157',
  'display-p3 1 1 1',
  'display-p3 .0078 .0118 .0157',
  'display-p3 1 1 1',
  'display-p3 .9020 .9059 .9098',
  'display-p3 .9804 .9804 .9804',
  'display-p3 1 1 1',
  'display-p3 1 1 1',
  'display-p3 0.8863 0.8941 0.9020',
  'display-p3 0.1569 0.1569 0.1569',
  'display-p3 0.8627 0.8627 0.8627',
  'display-p3 .9569 .9608 .9647',
  'display-p3 .9216 .9255 .9294',
];

const darkP3 = [
  'display-p3 .3020 .6980 .5608',
  'display-p3 0 .2549 .4706',
  'display-p3 1 1 1',
  'display-p3 .1216 .7647 .3529',
  'display-p3 .9804 .4118 .3137',
  'display-p3 1 .6667 .1961',
  'display-p3 1 1 1',
  'display-p3 .0078 .0118 .0157',
  'display-p3 .0078 .0118 .0157',
  'display-p3 1 1 1',
  'display-p3 .1647 .1765 .1882',
  'display-p3 .1451 .1569 .1647',
  'display-p3 .1176 .1294 .1373',
  'display-p3 .1373 .1451 .1529',
  'display-p3 .1373 .1451 .1529',
  'display-p3 0.2353 0.2353 0.2353',
  'display-p3 0.6275 0.6275 0.6275',
  'display-p3 .0941 .0980 .1020',
  'display-p3 0 0 0',
];

const semanticNames = [
  'box-container',
  'box-menu',
  'box-page',
  'box-flotation',
  'event-hover',
  'event-hover-brand',
  'event-hover-danger',
  'event-hover-base',
  'event-hover-face',
  'event-hover-same-black',
  'event-hover-same-white',
  'event-active-brand',
  'event-active-danger',
  'event-active-base',
  'event-active-face',
  'event-active-same-black',
  'event-active-same-white',
  'event-focus',
  'event-focus-brand',
  'event-disable-base',
  'event-disable-base-weaken',
  'stroke-hide',
  'stroke-base-primary',
  'stroke-base-secondary',
  'stroke-base-tertiary',
  'stroke-base-quaternary',
  'stroke-face-primary',
  'stroke-face-secondary',
  'stroke-divider-module',
  'stroke-divider-page',
  'stroke-divider-table',
  'stroke-outline-shallow',
  'stroke-outline-deep',
  'stroke-outline-subtle',
  'stroke-color-brand',
  'stroke-color-brand-active',
  'stroke-color-table-hover',
  'stroke-color-success',
  'stroke-color-decor',
  'stroke-color-danger',
  'stroke-color-danger-active',
  'stroke-same-white-primary',
  'stroke-same-white-secondary',
  'stroke-same-black-primary',
  'stroke-same-black-secondary',
  'text-brand-primary',
  'text-brand-secondary',
  'text-brand-tertiary',
  'text-brand-quaternary',
  'text-match',
  'text-success',
  'text-danger-primary',
  'text-danger-secondary',
  'text-warning',
  'text-same-black-primary',
  'text-same-black-secondary',
  'text-same-white-primary',
  'text-same-white-secondary',
  'text-base-primary',
  'text-base-secondary',
  'text-base-tertiary',
  'text-base-quaternary',
  'text-face-primary',
  'text-face-secondary',
  'text-face-tertiary',
  'text-face-quaternary',
  'text-hide',
  'material-hide',
  'material-brand-primary',
  'material-brand-tertiary',
  'material-brand-quaternary',
  'material-brand-quinary',
  'material-match-primary',
  'material-match-quaternary',
  'material-decor-primary',
  'material-decor-quaternary',
  'material-success-primary',
  'material-success-quaternary',
  'material-danger-primary',
  'material-danger-quaternary',
  'material-warning-primary',
  'material-warning-quaternary',
  'material-same-black',
  'material-same-white-primary',
  'material-same-white-secondary',
  'material-same-white-tertiary',
  'material-same-white-quaternary',
  'material-card-shallow',
  'material-card-moderate',
  'material-card-subtle',
  'material-card-deep',
  'material-base-primary',
  'material-base-secondary',
  'material-base-tertiary',
  'material-base-quaternary',
  'material-face-primary',
  'material-face-secondary',
  'material-face-tertiary',
  'material-face-quaternary',
  'data-table-head',
  'data-table-scroll-bar-background',
  'data-table-scroll-bar-indicator',
  'data-table-scroll-bar-indicator-hover',
  'effect-vulvar-shadow',
  'effect-vulvar-shadow-subtle',
  'effect-vulvar-shadow-glow',
  'effect-inner-shadow',
  'effect-inner-shadow-glow',
  'effect-popup-background',
  'effect-popup-box',
  'effect-flotation-box',
  'effect-mask',
  'effect-prompt',
];

const semanticLight = [
  'color(var(--eds-container) / .6)',
  'color(var(--eds-menu) / 1)',
  'color(var(--eds-page) / 1)',
  'color(var(--eds-flotation) / 1)',
  'color(var(--eds-base) / .05)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-base) / .07)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-base) / .05)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-module-stroke) / 1)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-base) / .04)',
  'color(var(--eds-base) / .12)',
  'color(var(--eds-base) / .18)',
  'color(var(--eds-base) / .06)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-decor) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-brand) / .2)',
  'color(var(--eds-match) / 1)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-warning) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-face) / .4)',
  'color(var(--eds-face) / .2)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-brand) / .2)',
  'color(var(--eds-brand) / .1)',
  'color(var(--eds-match) / 1)',
  'color(var(--eds-match) / .2)',
  'color(var(--eds-decor) / 1)',
  'color(var(--eds-decor) / .2)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-success) / .2)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .2)',
  'color(var(--eds-warning) / 1)',
  'color(var(--eds-warning) / .2)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-same-white) / .8)',
  'color(var(--eds-same-white) / .1)',
  'color(var(--eds-base) / .02)',
  'color(var(--eds-base) / .05)',
  'color(var(--eds-base) / .04)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-face) / .4)',
  'color(var(--eds-face) / .2)',
  'color(var(--eds-data-table) / .9)',
  'color(var(--eds-data-table) / .9)',
  'color(var(--eds-base) / .04)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-same-black) / .2)',
  'color(var(--eds-same-black) / .03)',
  'color(var(--eds-vulvar-glow) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-inner-glow) / 1)',
  'color(var(--eds-same-black) / .5)',
  'color(var(--eds-popup) / 1)',
  'color(var(--eds-flotation) / .6)',
  'color(var(--eds-page) / .6)',
  'color(var(--eds-base) / .9)',
];

const semanticDark = [
  'color(var(--eds-container) / .6)',
  'color(var(--eds-menu) / 1)',
  'color(var(--eds-page) / 1)',
  'color(var(--eds-flotation) / 1)',
  'color(var(--eds-base) / .07)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-base) / .07)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-module-stroke) / 1)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-base) / .04)',
  'color(var(--eds-base) / .14)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-decor) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .6)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-brand) / .2)',
  'color(var(--eds-match) / 1)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .6)',
  'color(var(--eds-warning) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-face) / .4)',
  'color(var(--eds-face) / .2)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-base) / 0)',
  'color(var(--eds-brand) / 1)',
  'color(var(--eds-brand) / .4)',
  'color(var(--eds-brand) / .2)',
  'color(var(--eds-brand) / .1)',
  'color(var(--eds-match) / 1)',
  'color(var(--eds-match) / .2)',
  'color(var(--eds-decor) / 1)',
  'color(var(--eds-decor) / .2)',
  'color(var(--eds-success) / 1)',
  'color(var(--eds-success) / .2)',
  'color(var(--eds-danger) / 1)',
  'color(var(--eds-danger) / .2)',
  'color(var(--eds-warning) / 1)',
  'color(var(--eds-warning) / .2)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-same-white) / 1)',
  'color(var(--eds-same-white) / .6)',
  'color(var(--eds-same-white) / .2)',
  'color(var(--eds-same-white) / .04)',
  'color(var(--eds-base) / .02)',
  'color(var(--eds-base) / .07)',
  'color(var(--eds-base) / .06)',
  'color(var(--eds-base) / .1)',
  'color(var(--eds-base) / 1)',
  'color(var(--eds-base) / .6)',
  'color(var(--eds-base) / .4)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-face) / 1)',
  'color(var(--eds-face) / .6)',
  'color(var(--eds-face) / .4)',
  'color(var(--eds-face) / .2)',
  'color(var(--eds-data-table) / .9)',
  'color(var(--eds-data-table) / .9)',
  'color(var(--eds-base) / .07)',
  'color(var(--eds-base) / .2)',
  'color(var(--eds-same-black) / .6)',
  'color(var(--eds-same-black) / .2)',
  'color(var(--eds-vulvar-glow) / 1)',
  'color(var(--eds-same-black) / 1)',
  'color(var(--eds-inner-glow) / 1)',
  'color(var(--eds-same-black) / .5)',
  'color(var(--eds-popup) / 1)',
  'color(var(--eds-flotation) / .6)',
  'color(var(--eds-page) / .6)',
  'color(var(--eds-base) / .2)',
];

const textStyles = [
  { name: 'Display/Large', size: 88, lineHeight: 110, weight: '700' },
  { name: 'Display/Medium', size: 80, lineHeight: 100, weight: '700' },
  { name: 'Display/Small', size: 72, lineHeight: 90, weight: '700' },
  { name: 'Headline/Large', size: 64, lineHeight: 80, weight: '700' },
  { name: 'Headline/Medium', size: 56, lineHeight: 70, weight: '700' },
  { name: 'Headline/Small', size: 48, lineHeight: 60, weight: '700' },
  { name: 'Title/Large', size: 40, lineHeight: 50, weight: '700' },
  { name: 'Title/Medium', size: 32, lineHeight: 40, weight: '700' },
  { name: 'Title/Small', size: 24, lineHeight: 30, weight: '700' },
  { name: 'Body/Large', size: 20, lineHeight: 26, weight: '400' },
  { name: 'Body/Large Strong', size: 20, lineHeight: 26, weight: '500' },
  { name: 'Body/Medium', size: 18, lineHeight: 24, weight: '400' },
  { name: 'Body/Medium Strong', size: 18, lineHeight: 24, weight: '500' },
  { name: 'Body/Small', size: 16, lineHeight: 20, weight: '400' },
  { name: 'Body/Small Strong', size: 16, lineHeight: 20, weight: '500' },
  { name: 'Footnote/Large', size: 14, lineHeight: 18, weight: '400' },
  { name: 'Footnote/Large Strong', size: 14, lineHeight: 18, weight: '500' },
  { name: 'Footnote/Medium', size: 12, lineHeight: 16, weight: '400' },
  { name: 'Footnote/Medium Strong', size: 12, lineHeight: 16, weight: '500' },
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-');
}

function tokenSlug(name) {
  return `typography-${slugify(name)}`;
}

const colorBase = {
  $schema: './base.schema.json',
  $figma: `${FIGMA_URL}&node-id=2008-41`,
  $description:
    'Color System base palette (基色). Website file — display-p3 with sRGB fallback.',
  light: Object.fromEntries(
    colorNames.map((name, index) => [name, parseP3(lightP3[index])]),
  ),
  dark: Object.fromEntries(
    colorNames.map((name, index) => [name, parseP3(darkP3[index])]),
  ),
};

const colorSemantic = {
  $figma: `${FIGMA_URL}&node-id=2536-5814`,
  $description:
    'Color System semantic colors (语义色). Website event tokens expanded for web interactions.',
  tokens: semanticNames.map((name, index) => ({
    name,
    light: semanticLight[index],
    dark: semanticDark[index],
  })),
};

const uniqueSizes = [...new Set(textStyles.map((s) => s.size))].sort((a, b) => b - a);
const uniqueLineHeights = [...new Set(textStyles.map((s) => s.lineHeight))].sort(
  (a, b) => b - a,
);

const typographyBase = {
  $figma: FIGMA_URL,
  $description: 'Typography System base primitives for EverGreen Design System (Website).',
  groups: [
    {
      comment: '字号',
      tokens: Object.fromEntries(
        textStyles.map((style) => [
          `size-${slugify(style.name)}`,
          `${style.size}px`,
        ]),
      ),
    },
    {
      comment: '行高',
      tokens: Object.fromEntries(
        textStyles.map((style) => [
          `line-height-${slugify(style.name)}`,
          `${style.lineHeight}px`,
        ]),
      ),
    },
    {
      comment: '字重',
      tokens: {
        'weight-regular': '400',
        'weight-medium': '500',
        'weight-bold': '700',
      },
    },
    {
      comment: '字体家族',
      tokens: {
        'font-family-text':
          '"EDS Text", "PingFang SC", "SourceHanSansSC", "Apple Color Emoji", "Segoe UI Emoji", sans-serif',
      },
    },
  ],
};

const typographySemantic = {
  $figma: FIGMA_URL,
  $description: 'Typography semantic role tokens aligned with Figma Text Styles.',
  groups: textStyles.map((style) => ({
    comment: style.name,
    tokens: [
      {
        name: `${tokenSlug(style.name)}-size`,
        value: `var(--size-${slugify(style.name)})`,
      },
      {
        name: `${tokenSlug(style.name)}-weight`,
        value:
          style.weight === '700'
            ? 'var(--weight-bold)'
            : style.weight === '500'
              ? 'var(--weight-medium)'
              : 'var(--weight-regular)',
      },
      {
        name: `${tokenSlug(style.name)}-line-height`,
        value: `var(--line-height-${slugify(style.name)})`,
      },
    ],
  })),
};

const textStylesSpec = {
  $figma: FIGMA_URL,
  $description: 'Text styles from Figma Text Styles (Website). Class names match export.',
  styles: textStyles.map((style) => ({
    title: style.name,
    className: tokenSlug(style.name),
    properties: {
      'font-size': `var(--${tokenSlug(style.name)}-size)`,
      'font-weight': `var(--${tokenSlug(style.name)}-weight)`,
      'line-height': `var(--${tokenSlug(style.name)}-line-height)`,
    },
  })),
};

writeFileSync(join(specDir, 'color/base.json'), formatColorBaseJson(colorBase));
writeFileSync(
  join(specDir, 'color/semantic.json'),
  `${JSON.stringify(colorSemantic, null, 2)}\n`,
);
writeFileSync(
  join(specDir, 'typography/base.json'),
  `${JSON.stringify(typographyBase, null, 2)}\n`,
);
writeFileSync(
  join(specDir, 'typography/semantic.json'),
  `${JSON.stringify(typographySemantic, null, 2)}\n`,
);
writeFileSync(join(specDir, 'text/styles.json'), `${JSON.stringify(textStylesSpec, null, 2)}\n`);

console.log('✓ Website token specs generated');
console.log(`  color base: ${colorNames.length} primitives`);
console.log(`  color semantic: ${semanticNames.length} tokens`);
console.log(`  typography styles: ${textStyles.length} text styles`);
