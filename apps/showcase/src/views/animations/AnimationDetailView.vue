<script setup lang="ts">
import { computed } from 'vue';
import { findAnimationMeta } from '@/data/animations';
import shared from '@/views/shared/showcase.module.css';

const props = defineProps<{
  slug: string;
}>();

const meta = computed(() => findAnimationMeta(props.slug));
</script>

<template>
  <section v-if="meta" :class="shared.section">
    <p :class="shared.bodyText">
      {{ meta.name }} 动画预览即将接入 @eds/website-animations。Motion token 见 Tokens → Motion。
    </p>
  </section>
</template>
