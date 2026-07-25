/// <reference types="vite/client" />

declare module '@eds/website-tokens/json' {
  const tokens: Record<string, unknown>;
  export default tokens;
}

declare module '@eds/website-tokens/corner-smoothing' {
  export function initCornerSmoothing(): void;
  export function rescanCornerSmoothing(root?: ParentNode): void;
}
