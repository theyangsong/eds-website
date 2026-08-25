import {
  initCornerSmoothing,
  rescanCornerSmoothing,
} from '@eds/website-tokens/corner-smoothing';

/** Bind Figma/iOS squircle (--corner-smoothing) to rounded Website components. */
export function initEdsWebsiteRuntime(options?: { root?: HTMLElement }) {
  if (typeof document === 'undefined') {
    return [];
  }

  return initCornerSmoothing(options);
}

export { initCornerSmoothing, rescanCornerSmoothing };
