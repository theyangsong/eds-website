import { createApp } from 'vue';
import { applyTheme } from '@eds/website-components';
import { initCornerSmoothing, rescanCornerSmoothing } from '@eds/website-tokens/corner-smoothing';
import App from './App.vue';
import { router } from './router';
import './styles/global.css';

applyTheme('light');

const app = createApp(App).use(router);

app.mount('#app');
initCornerSmoothing();

router.afterEach(() => {
  requestAnimationFrame(() => {
    rescanCornerSmoothing();
  });
});
