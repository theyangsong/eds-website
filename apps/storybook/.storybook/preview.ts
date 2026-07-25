import type { Preview } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { initCornerSmoothing } from '@eds/website-tokens/corner-smoothing';
import { initLiquidGlass } from '@eds/website-tokens/liquid-glass';
import '@eds/website-tokens';
import '@eds/website-components/style.css';

initLiquidGlass();
initCornerSmoothing();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'padded',
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
