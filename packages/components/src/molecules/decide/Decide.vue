<script setup lang="ts">
import { computed } from 'vue';
import styles from '../toggle/ToggleControl.module.css';
import {
  decideVariantName,
  type ToggleControlSize,
} from '../../utils/toggleVariantName';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: ToggleControlSize;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: false,
    size: 'lg',
    disabled: false,
    id: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const variantName = computed(() =>
  decideVariantName(props.modelValue, props.size, props.disabled),
);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('change', target.checked);
}
</script>

<template>
  <label
    :class="styles.root"
    :data-size="size"
    :data-disabled="disabled ? true : undefined"
    :for="id"
  >
    <input
      :id="id"
      :class="styles.input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span :class="[variantName, styles.surface]" aria-hidden="true">
      <svg
        v-if="!modelValue && !disabled"
        :class="[styles.icon, styles.hoverCheckIcon]"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6.2 5.1 8.8 9.5 3.8"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="modelValue"
        :class="[styles.icon, styles.checkIcon]"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6.2 5.1 8.8 9.5 3.8"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="$slots.default" :class="styles.label">
      <slot />
    </span>
  </label>
</template>
