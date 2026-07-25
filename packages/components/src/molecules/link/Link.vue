<script setup lang="ts">
import { computed } from 'vue';
import styles from './Link.module.css';
import { linkVariantName } from '../../utils/edsVariantName';

export type LinkTone = 'brand' | 'theme';
export type LinkSize = 'lg' | 'md' | 'sm';

const props = withDefaults(
  defineProps<{
    tone?: LinkTone;
    size?: LinkSize;
    href?: string;
    disabled?: boolean;
  }>(),
  {
    tone: 'brand',
    size: 'lg',
    href: '#',
    disabled: false,
  },
);

const variantName = computed(() =>
  linkVariantName(props.tone, props.size, props.disabled),
);
</script>

<template>
  <a
    :class="[variantName, styles.link, styles[props.tone], styles[props.size]]"
    :href="disabled ? undefined : href"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : undefined"
    @click="disabled && $event.preventDefault()"
  >
    <slot />
  </a>
</template>
