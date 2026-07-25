<script setup lang="ts">
import '@eds/website-components/style.css';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import PageHeader from '@/components/shared/PageHeader.vue';
import ComponentsPageAnchors from '@/components/shared/ComponentsPageAnchors.vue';
import { findCatalogItem } from '@/data/components/navigation';
import shared from '@/views/shared/showcase.module.css';
import styles from './ComponentsView.module.css';

const route = useRoute();

const location = computed(() => {
  const slug = route.params.slug;
  return typeof slug === 'string' ? findCatalogItem(slug) : undefined;
});

const headerTitle = computed(() => location.value?.item.name ?? 'Components');
const headerLead = computed(() => location.value?.item.description ?? '');
</script>

<template>
  <div :class="styles.pageWithAnchors">
    <div :class="[shared.page, styles.componentPage]">
      <PageHeader :title="headerTitle" :lead="headerLead" />

      <RouterView />
    </div>

    <ComponentsPageAnchors />
  </div>
</template>
