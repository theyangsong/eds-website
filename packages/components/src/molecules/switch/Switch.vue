<script setup lang="ts">
import { computed } from 'vue';
import styles from '../toggle/ToggleControl.module.css';
import { switchVariantName } from '../../utils/toggleVariantName';
import type { ToggleControlSize } from '../../utils/toggleVariantName';

export type SwitchSize = ToggleControlSize;

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: SwitchSize;
    disabled?: boolean;
    id?: string;
  }>(),
  {
    modelValue: false,
    size: 'md',
    disabled: false,
    id: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const variantName = computed(() =>
  switchVariantName(props.modelValue, props.size, props.disabled),
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
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      @change="onChange"
    />
    <span :class="[variantName, styles.surface]" aria-hidden="true">
      <span :class="styles.knob" />
    </span>
    <span v-if="$slots.default" :class="styles.label">
      <slot />
    </span>
  </label>
</template>
