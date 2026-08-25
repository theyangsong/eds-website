import './styles/global.css';
import './styles/interactionHoverTooltip.css';
import './styles/motionPageTransition.css';
import './styles/motionLayoutDeformTransition.css';
import './atoms/motion-hover-enter/motionHoverEnterOnly.css';
import { initEdsWebsiteRuntime } from './setup/initEdsWebsiteRuntime';

initEdsWebsiteRuntime();

export * from './atoms';
export * from './text';
export * from './molecules';
export * from './organisms';
export * from './templates';
export * from './pages';

export {
  applyTheme,
  getPreferredTheme,
  toggleTheme,
  type ThemeMode,
} from './composables/useTheme';

export { initThemeProvider, useThemeProvider } from './composables/useThemeProvider';

export {
  initEdsWebsiteRuntime,
  initCornerSmoothing,
  rescanCornerSmoothing,
} from './setup/initEdsWebsiteRuntime';

export { formatGroupedNumber } from './utils';
