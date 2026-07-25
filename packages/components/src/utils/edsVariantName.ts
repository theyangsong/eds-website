/** Join Figma-style variant segments: name_style_size_extra… (lowercase, underscore). */
export function edsVariantName(
  name: string,
  style?: string,
  size?: string,
  ...extras: (string | false | undefined | null)[]
): string {
  const parts = [name, style, size, ...extras].filter(
    (part): part is string => Boolean(part),
  );
  return parts.join('_').toLowerCase();
}

export function toSnakeSegment(value: string): string {
  return value.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

export function buttonVariantName(
  tone: string,
  variant: string,
  size: string,
  options?: { disable?: boolean; loading?: boolean },
): string {
  const style = `${toSnakeSegment(tone)}_${variant}`;
  return edsVariantName(
    'button',
    style,
    size,
    options?.loading && 'loading',
    options?.disable && 'disable',
  );
}

export function buttonIconVariantName(
  shape: string,
  size: string,
  disable?: boolean,
): string {
  return edsVariantName('button_icon', shape, size, disable && 'disable');
}

export function buttonIconProVariantName(options?: {
  disable?: boolean;
  badge?: boolean;
  reddot?: boolean;
}): string {
  return edsVariantName(
    'button_icon_pro',
    undefined,
    undefined,
    options?.badge && 'badge',
    options?.reddot && 'reddot',
    options?.disable && 'disable',
  );
}

export function inputVariantName(
  type: string,
  size: string,
  options?: {
    disable?: boolean;
    readonly?: boolean;
    invalid?: boolean;
    full?: boolean;
  },
): string {
  return edsVariantName(
    'input',
    type,
    size,
    options?.full && 'full',
    options?.readonly && 'readonly',
    options?.invalid && 'invalid',
    options?.disable && 'disable',
  );
}

export function linkVariantName(
  tone: string,
  size: string,
  disable?: boolean,
): string {
  return edsVariantName('link', tone, size, disable && 'disable');
}

export type { ToggleControlSize } from './toggleVariantName';
export {
  switchVariantName,
  checkboxVariantName,
  radioVariantName,
  decideVariantName,
} from './toggleVariantName';

export function paginationItemVariantName(
  kind: string,
  tone: string,
  disable?: boolean,
): string {
  return edsVariantName(
    'pagination_item',
    `${kind}_${tone}`,
    undefined,
    disable && 'disable',
  );
}
