import { edsVariantName } from './edsVariantName';

/** Toggle control sizes (Switch track + Checkbox / Radio / Decide box). */
export type ToggleControlSize = 'lg' | 'md' | 'sm';

export function switchVariantName(
  on: boolean,
  size: ToggleControlSize,
  disable?: boolean,
): string {
  return edsVariantName(
    'toggle',
    'switch',
    size,
    on ? 'on' : 'off',
    disable && 'disable',
  );
}

export function checkboxVariantName(
  checked: boolean,
  indeterminate: boolean,
  size: ToggleControlSize,
  disable?: boolean,
): string {
  const state = indeterminate
    ? 'checked_indeterminate'
    : checked
      ? 'checked'
      : 'unchecked';
  return edsVariantName('toggle', 'checkbox', size, state, disable && 'disable');
}

export function radioVariantName(
  checked: boolean,
  size: ToggleControlSize,
  disable?: boolean,
): string {
  return edsVariantName(
    'toggle',
    'radio',
    size,
    checked ? 'checked' : 'unchecked',
    disable && 'disable',
  );
}

export function decideVariantName(
  decided: boolean,
  size: ToggleControlSize,
  disable?: boolean,
): string {
  return edsVariantName(
    'toggle',
    'decide',
    size,
    decided ? 'decided' : 'undecided',
    disable && 'disable',
  );
}
