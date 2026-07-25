# EverGreen Website Showcase

Website 设计系统的本地预览站：token 画廊、组件 live preview、场景目录。

## 依赖

| 包 | 来源 | 用途 |
|----|------|------|
| `@eds/website-tokens` | `packages/tokens` | 壳层 + token 页 |
| `@eds/website-components` | `packages/components` | 组件预览 |
| `@eds/website-scenes` | `packages/scenes` | 场景目录 |

## 启动

```bash
pnpm install
pnpm dev:showcase
```

打开 http://localhost:5175/

## 颜色变量（与 Desktop 共用 Color System）

`packages/tokens/spec/color/` 与 **eds-desktop** 的 Color System 对齐（基色 + 111 个 semantic）。修改颜色后在本仓库执行：

```bash
pnpm --filter @eds/website-tokens build
pnpm dev:showcase   # 或 prebuild，以刷新 @eds/website-tokens/json 与 CSS
```

预览站 `/tokens` 读取构建产物；**改 spec 后必须 rebuild tokens**，否则页面仍是旧数据。

## 页面

| 路由 | 内容 |
|------|------|
| `/` | 概览 |
| `/tokens` | Website 颜色、尺度、排版、语义变量 |
| `/components/:slug` | Website 组件 live preview |
| `/scenes` | Website 场景目录 |

## 已实现预览

- Icons、Input、Button、Toggle

Input 及 Organisms/Templates/Scenes 组件预览待 package 实现后补充。
