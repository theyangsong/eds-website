<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import styles from '../toggle/ToggleControl.module.css';
import {
  checkboxVariantName,
  type ToggleControlSize,
} from '../../utils/toggleVariantName';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: ToggleControlSize;
    disabled?: boolean;
    indeterminate?: boolean;
    id?: string;
  }>(),
  {
    modelValue: false,
    size: 'lg',
    disabled: false,
    indeterminate: false,
    id: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const variantName = computed(() =>
  checkboxVariantName(
    props.modelValue,
    props.indeterminate,
    props.size,
    props.disabled,
  ),
);

watch(
  () => props.indeterminate,
  (value) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = value;
    }
  },
  { immediate: true },
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
      ref="inputRef"
      :class="styles.input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      @change="onChange"
    />
    <span :class="[variantName, styles.surface]" aria-hidden="true">
      <svg
        v-if="!modelValue && !disabled && !indeterminate"
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
        v-if="indeterminate"
        :class="[styles.icon, styles.indeterminateIcon]"
        viewBox="0 0 10 2"
        fill="currentColor"
        aria-hidden="true"
      >
        <rect width="10" height="2" rx="1" />
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
