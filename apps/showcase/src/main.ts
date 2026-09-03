import { createApp } from 'vue';
import { applyTheme, rescanCornerSmoothing } from '@eds/website-components';
import App from './App.vue';
import { router } from './router';
import { installGlobalWheelScrollContainment } from './composables/scrollContainment';
import './styles/global.css';
import './styles/showcase-components-scope.css';
import './styles/showcase-motion-global.css';
import './styles/showcase-token-scope.css';
import './styles/showcase-shell.css';

installGlobalWheelScrollContainment();

applyTheme('light');

const app = createApp(App).use(router);

app.mount('#app');

router.afterEach(() => {
  requestAnimationFrame(() => {
    rescanCornerSmoothing();
  });
});
