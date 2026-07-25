<script setup lang="ts">
import { computed } from 'vue';
import styles from '../toggle/ToggleControl.module.css';
import {
  radioVariantName,
  type ToggleControlSize,
} from '../../utils/toggleVariantName';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: ToggleControlSize;
    disabled?: boolean;
    name?: string;
    value?: string;
    id?: string;
  }>(),
  {
    modelValue: false,
    size: 'lg',
    disabled: false,
    name: undefined,
    value: undefined,
    id: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const variantName = computed(() =>
  radioVariantName(props.modelValue, props.size, props.disabled),
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
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span :class="[variantName, styles.surface]" aria-hidden="true">
      <span v-if="!modelValue && !disabled" :class="styles.radioHoverDot" />
      <span v-if="modelValue" :class="styles.radioDot" />
    </span>
    <span v-if="$slots.default" :class="styles.label">
      <slot />
    </span>
  </label>
</template>
