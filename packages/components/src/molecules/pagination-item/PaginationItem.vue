<script setup lang="ts">
import { computed } from 'vue';
import styles from './PaginationItem.module.css';
import { paginationItemVariantName } from '../../utils/edsVariantName';

export type PaginationItemKind = 'number' | 'symbol' | 'button';
export type PaginationItemTone = 'brand' | 'decor';

const props = withDefaults(
  defineProps<{
    kind?: PaginationItemKind;
    tone?: PaginationItemTone;
    label?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    kind: 'number',
    tone: 'decor',
    label: '0',
    disabled: false,
    type: 'button',
  },
);

const variantName = computed(() =>
  paginationItemVariantName(props.kind, props.tone, props.disabled),
);
</script>

<template>
  <button
    :class="[variantName, styles.item, styles[props.kind], styles[props.tone]]"
    :disabled="disabled"
    :type="type"
    :aria-label="kind === 'number' ? label : undefined"
  >
    <span v-if="kind === 'number'" :class="styles.label">{{ label }}</span>
    <span v-else :class="styles.icon">
      <slot />
    </span>
  </button>
</template>
