# EverGreen Design System (Website)

Vue 3 design system for marketing sites and web products — CSS Modules and Figma-synced design tokens.

## Requirements

- Node.js 20+
- pnpm 9+

## Quick start

```bash
pnpm install
pnpm build:tokens
pnpm build:components
pnpm dev:showcase    # gallery app → http://localhost:5175
pnpm dev:storybook   # component docs → http://localhost:6007
```

## Project structure

```
eds-website/
├── apps/
│   ├── showcase/        # Website token & component gallery
│   └── storybook/       # Website component documentation
├── packages/
│   ├── tokens/          # L1 全局变量（基数 → 语义）
│   ├── components/      # L2 组件（atoms → molecules → organisms）
│   └── scenes/          # L3 场景化（营销 / 业务页面区块）
└── figma.config.json
```

### 组件分层（`@eds/website-components`）

```
src/
├── atoms/       Divider, Icons, Crypto, Avatar
├── text/
│   ├── typography/   基础层（字号 / 字重 / 行高 / 字体家族）
│   └── styles/       样式层（Figma Text Styles，引用 typography）
├── molecules/   Input, Button, MenuBox, …
│                Feedback, Popovers, Countdown, Progress, Skeleton, Upload
├── organisms/   NavBar, ModuleMenu, ToolBar, Paginer, DataList,
│                DataTableView, DataTableEdit, Detail, Reminder, Verify,
│                Filter, BatchBar
├── templates/   Container, Layout, Popup, Skid
├── pages/       placeholder-1
├── composables/
└── styles/
```

### 场景化（`@eds/website-scenes`）

```
src/
└── placeholder-1/
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm build:tokens` | Build CSS variables from tokens |
| `pnpm build:components` | Build Vue component library |
| `pnpm build:scenes` | Build website scene library |
| `pnpm dev` | Start showcase gallery (http://localhost:5175) |
| `pnpm dev:showcase` | Start showcase gallery (http://localhost:5175) |
| `pnpm dev:storybook` | Start Storybook (http://localhost:6007) |
| `pnpm sync:tokens` | Figma token sync helper |
| `pnpm typecheck` | Type-check all packages |

## Figma integration

Figma file: [EverGreen Design System (WebSite)](https://www.figma.com/design/RSjA0dgInAwyPjE1MIinH7/EverGreen-Design-System--WebSite-)

1. Compare Figma variables with `packages/tokens/spec/*.json`
2. Update the relevant spec files
3. Run `pnpm build:tokens` to regenerate CSS variables

Check sync status: `pnpm sync:tokens`

## Related

- [EverGreen Design System (Desktop)](../eds-desktop) — independent sibling repo for desktop/admin UI

## License

MIT
