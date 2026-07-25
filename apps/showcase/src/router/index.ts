import { createRouter, createWebHistory } from 'vue-router';
import ShowcaseLayout from '@/layout/ShowcaseLayout.vue';
import HomeView from '@/views/home/HomeView.vue';
import TokensView from '@/views/tokens/TokensView.vue';
import ComponentsView from '@/views/components/ComponentsView.vue';
import ComponentDetailView from '@/views/components/ComponentDetailView.vue';
import ScenesView from '@/views/scenes/ScenesView.vue';
import {
  defaultComponentSlug,
  isValidComponentSlug,
} from '@/data/components/navigation';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ShowcaseLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'tokens', name: 'tokens', component: TokensView },
        {
          path: 'components',
          component: ComponentsView,
          children: [
            {
              path: '',
              redirect: {
                name: 'component-detail',
                params: { slug: defaultComponentSlug },
              },
            },
            {
              path: ':slug',
              name: 'component-detail',
              component: ComponentDetailView,
              props: true,
              beforeEnter: (to) => {
                const slug = to.params.slug;
                if (typeof slug !== 'string' || !isValidComponentSlug(slug)) {
                  return {
                    name: 'component-detail',
                    params: { slug: defaultComponentSlug },
                  };
                }
              },
            },
          ],
        },
        { path: 'scenes', name: 'scenes', component: ScenesView },
      ],
    },
  ],
});
