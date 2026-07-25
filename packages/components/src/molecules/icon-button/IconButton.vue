<script setup lang="ts">
import { computed } from 'vue';
import styles from './IconButton.module.css';
import { buttonIconVariantName } from '../../utils/edsVariantName';

/** Figma Type */
export type IconButtonShape = 'rectangular' | 'square' | 'round';
export type IconButtonSize = 'lg' | 'md' | 'sm' | 'xs';

const props = withDefaults(
  defineProps<{
    shape?: IconButtonShape;
    size?: IconButtonSize;
    label: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    shape: 'square',
    size: 'md',
    disabled: false,
    type: 'button',
  },
);

const variantName = computed(() =>
  buttonIconVariantName(props.shape, props.size, props.disabled),
);
</script>

<template>
  <button
    :class="[variantName, styles.button, styles[props.shape], styles[props.size]]"
    :disabled="disabled"
    :type="type"
    :aria-label="label"
  >
    <span :class="styles.icon">
      <slot />
    </span>
  </button>
</template>
