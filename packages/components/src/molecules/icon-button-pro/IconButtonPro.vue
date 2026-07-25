<script setup lang="ts">
import { computed } from 'vue';
import styles from './IconButtonPro.module.css';
import { buttonIconProVariantName } from '../../utils/edsVariantName';

const props = withDefaults(
  defineProps<{
    label: string;
    badge?: string | number;
    showBadge?: boolean;
    showReddot?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    badge: 0,
    showBadge: false,
    showReddot: false,
    disabled: false,
    type: 'button',
  },
);

const variantName = computed(() =>
  buttonIconProVariantName({
    disable: props.disabled,
    badge: props.showBadge,
    reddot: props.showReddot,
  }),
);
</script>

<template>
  <button
    :class="[variantName, styles.root, disabled && styles.disabled]"
    :disabled="disabled"
    :type="type"
    :aria-label="label"
  >
    <span :class="styles.iconWrap">
      <span :class="styles.icon">
        <slot />
      </span>
    </span>
    <span v-if="showBadge" :class="styles.badge" aria-hidden="true">
      {{ badge }}
    </span>
    <span v-if="showReddot" :class="styles.reddot" aria-hidden="true" />
    <span :class="styles.label">{{ label }}</span>
  </button>
</template>
