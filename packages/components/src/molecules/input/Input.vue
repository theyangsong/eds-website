<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import styles from './Input.module.css';
import { inputVariantName } from '../../utils/edsVariantName';

export type InputType = 'standard' | 'amount';
export type InputSize = 'lg' | 'md' | 'sm';
export type InputWidthMode = 'fixed' | 'full';
export type InputControlType = 'text' | 'password' | 'email' | 'tel';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: InputType;
    size?: InputSize;
    widthMode?: InputWidthMode;
    placeholder?: string;
    amountPlaceholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    unit?: string;
    clearable?: boolean;
    showMax?: boolean;
    maxLabel?: string;
    inputmode?: 'text' | 'decimal' | 'numeric';
    controlType?: InputControlType;
    autocomplete?: string;
    maxlength?: number;
    invalid?: boolean;
  }>(),
  {
    modelValue: '',
    type: 'standard',
    size: 'lg',
    widthMode: 'fixed',
    placeholder: '请输入',
    amountPlaceholder: '0',
    disabled: false,
    readonly: false,
    clearable: true,
    showMax: false,
    maxLabel: 'Max',
    inputmode: undefined,
    controlType: 'text',
    autocomplete: undefined,
    maxlength: undefined,
    invalid: false,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
  clear: [];
  max: [];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
const focused = ref(false);
const unitLeftPx = ref(0);
const valueWidthPx = ref(0);
const unitWidthPx = ref(0);

const inputRenderStyle = {
  textRendering: 'geometricPrecision',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
} as const;

const isAmount = computed(() => props.type === 'amount');
const useGhostUnit = computed(() => isAmount.value && Boolean(props.unit));

const variantName = computed(() =>
  inputVariantName(props.type, props.size, {
    disable: props.disabled,
    readonly: props.readonly,
    invalid: props.invalid,
    full: props.widthMode === 'full',
  }),
);

const resolvedInputMode = computed(
  () => props.inputmode ?? (isAmount.value ? 'decimal' : 'text'),
);

const resolvedPlaceholder = computed(() => {
  if (useGhostUnit.value) {
    return `${props.amountPlaceholder} ${props.unit}`;
  }

  return isAmount.value ? props.amountPlaceholder : props.placeholder;
});

const showClear = computed(
  () =>
    props.clearable &&
    focused.value &&
    !props.disabled &&
    !props.readonly &&
    props.modelValue.length > 0,
);

const showInlineUnit = computed(
  () => Boolean(props.unit) && !useGhostUnit.value,
);

const showGhostUnit = computed(
  () => useGhostUnit.value && props.modelValue.length > 0,
);

const reserveClearSpace = computed(
  () =>
    props.clearable &&
    (showInlineUnit.value || props.showMax || Boolean(slots.suffix)),
);

const showDefaultSuffix = computed(
  () =>
    showClear.value ||
    reserveClearSpace.value ||
    showInlineUnit.value ||
    props.showMax,
);

const showSuffix = computed(
  () => Boolean(slots.suffix) || showDefaultSuffix.value,
);

const amountControlStyle = computed(() => {
  if (!useGhostUnit.value) {
    return undefined;
  }

  const gap = 4;
  const width =
    props.modelValue.length > 0
      ? valueWidthPx.value + gap + unitWidthPx.value
      : valueWidthPx.value > 0
        ? valueWidthPx.value
        : undefined;

  return {
    '--eds-input-unit-left': `${unitLeftPx.value}px`,
    width: width ? `${width}px` : undefined,
  };
});

const shrinkInputStyle = computed(() => {
  if (!useGhostUnit.value) {
    return undefined;
  }

  if (props.modelValue.length > 0) {
    return { width: `${Math.max(valueWidthPx.value, 1)}px` };
  }

  if (valueWidthPx.value > 0) {
    return { width: `${valueWidthPx.value}px` };
  }

  return undefined;
});

function measureTextWidth(text: string, source: HTMLElement) {
  const style = getComputedStyle(source);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return text.length * 8;
  }

  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return context.measureText(text).width;
}

function updateGhostUnitMetrics() {
  const input = inputRef.value;
  if (!input || !useGhostUnit.value || !props.unit) {
    unitLeftPx.value = 0;
    valueWidthPx.value = 0;
    unitWidthPx.value = 0;
    return;
  }

  const gap = 4;
  const value = props.modelValue;
  unitWidthPx.value = measureTextWidth(props.unit, input);

  if (value.length > 0) {
    valueWidthPx.value = measureTextWidth(value, input);
    unitLeftPx.value = valueWidthPx.value + gap;
  } else {
    valueWidthPx.value = measureTextWidth(resolvedPlaceholder.value, input);
    unitLeftPx.value = 0;
  }
}

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

function onFocus(event: FocusEvent) {
  focused.value = true;
  emit('focus', event);
}

function onBlur(event: FocusEvent) {
  focused.value = false;
  emit('blur', event);
}

function onClear() {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
}

function onMax() {
  emit('max');
}

function onFieldClick(event: MouseEvent) {
  if (props.disabled || props.readonly) {
    return;
  }

  const target = event.target as HTMLElement;
  if (target.closest('button')) {
    return;
  }

  inputRef.value?.focus();
}

watch(
  () => [props.modelValue, props.unit, props.type, props.size] as const,
  async () => {
    await nextTick();
    updateGhostUnitMetrics();
  },
  { immediate: true },
);

onMounted(() => {
  updateGhostUnitMetrics();
});
</script>

<template>
  <div
    :class="[
      variantName,
      'eds-corner-smoothed',
      styles.field,
      widthMode === 'full' ? styles.widthFull : styles.widthFixed,
      styles[size],
      isAmount && styles.amount,
      focused && styles.fieldFocused,
      disabled && styles.fieldDisabled,
      invalid && styles.fieldInvalid,
    ]"
    @click="onFieldClick"
  >
    <div :class="styles.prefix">
      <slot name="prefix">
        <div
          :class="[styles.valueGroup, useGhostUnit && styles.amountControl]"
          :style="amountControlStyle"
        >
          <input
            ref="inputRef"
            :class="[
              styles.input,
              useGhostUnit && styles.shrinkInput,
              useGhostUnit && styles.amountInput,
            ]"
            :style="[inputRenderStyle, shrinkInputStyle]"
            :value="modelValue"
            :type="controlType"
            :inputmode="resolvedInputMode"
            :placeholder="resolvedPlaceholder"
            :disabled="disabled"
            :readonly="readonly"
            :autocomplete="autocomplete"
            :maxlength="maxlength"
            :aria-invalid="invalid || undefined"
            spellcheck="false"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
          />

          <span
            v-if="showGhostUnit"
            :class="[styles.ghostUnit]"
            aria-hidden="true"
          >
            {{ unit }}
          </span>
        </div>
      </slot>
    </div>

    <div v-if="showSuffix" :class="styles.suffix">
      <slot name="suffix">
        <button
          v-if="clearable && (showClear || reserveClearSpace)"
          type="button"
          :class="[styles.clearButton, !showClear && styles.clearButtonHidden]"
          aria-label="Clear"
          :aria-hidden="!showClear"
          :tabindex="showClear ? 0 : -1"
          @mousedown.prevent
          @click="onClear"
        >
          <svg
            :class="styles.clearIcon"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="7" fill="currentColor" />
            <path
              d="M6 6l4 4m0-4-4 4"
              stroke="var(--material-same-white-primary)"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </button>

        <span
          v-if="showInlineUnit"
          :class="[styles.unit]"
        >
          {{ unit }}
        </span>

        <button
          v-if="showMax"
          type="button"
          :class="styles.maxButton"
          :disabled="disabled"
          @click="onMax"
        >
          {{ maxLabel }}
        </button>
      </slot>
    </div>
  </div>
</template>
