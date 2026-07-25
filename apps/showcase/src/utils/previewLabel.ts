/**
 * Showcase row labels: 中文 + space + API/Figma key (lowercase segment).
 * Must match component props / variant names — never alias keys (e.g. no "Large" for lg).
 */

export function previewLabel(zh: string, key: string): string {
  return `${zh} ${key}`;
}

export const previewSizeLabel: Record<'lg' | 'md' | 'sm' | 'xs', string> = {
  lg: previewLabel('大', 'lg'),
  md: previewLabel('中', 'md'),
  sm: previewLabel('小', 'sm'),
  xs: previewLabel('超小', 'xs'),
};

export const previewLinkSizeLabel: Record<'lg' | 'md' | 'sm', string> = {
  lg: previewSizeLabel.lg,
  md: previewSizeLabel.md,
  sm: previewSizeLabel.sm,
};

export const previewButtonVariantLabel: Record<'solid' | 'outline' | 'text', string> = {
  solid: previewLabel('实心', 'solid'),
  outline: previewLabel('描边', 'outline'),
  text: previewLabel('文字', 'text'),
};

export const previewButtonToneLabel: Record<
  'brand' | 'danger' | 'decor' | 'subtle' | 'sameWhite',
  string
> = {
  brand: previewLabel('品牌', 'brand'),
  danger: previewLabel('危险', 'danger'),
  decor: previewLabel('装饰', 'decor'),
  subtle: previewLabel('弱', 'subtle'),
  sameWhite: previewLabel('同白', 'sameWhite'),
};

export const previewLinkToneLabel: Record<'brand' | 'theme', string> = {
  brand: previewLabel('品牌', 'brand'),
  theme: previewLabel('主题', 'theme'),
};

export const previewIconShapeLabel: Record<'rectangular' | 'square' | 'round', string> = {
  rectangular: previewLabel('矩形', 'rectangular'),
  square: previewLabel('方形', 'square'),
  round: previewLabel('圆形', 'round'),
};

export const previewPaginationKindLabel: Record<'number' | 'symbol' | 'button', string> = {
  number: previewLabel('数字', 'number'),
  symbol: previewLabel('符号', 'symbol'),
  button: previewLabel('按钮', 'button'),
};

export const previewPaginationToneLabel: Record<'decor' | 'brand', string> = {
  decor: previewLabel('装饰', 'decor'),
  brand: previewLabel('品牌', 'brand'),
};

export const previewStateDisableLabel = previewLabel('禁用', 'disable');
export const previewStateLoadingLabel = previewLabel('加载', 'loading');

export const previewCheckboxStateLabel = {
  unchecked: previewLabel('未选', 'unchecked'),
  checked: previewLabel('选中', 'checked'),
  checkedIndeterminate: previewLabel('半选', 'checked_indeterminate'),
} as const;

export const previewRadioStateLabel = {
  unchecked: previewLabel('未选', 'unchecked'),
  checked: previewLabel('选中', 'checked'),
} as const;

export const previewDecideStateLabel = {
  undecided: previewLabel('未定', 'undecided'),
  decided: previewLabel('已定', 'decided'),
} as const;

export const previewInputTypeLabel: Record<'standard' | 'amount', string> = {
  standard: previewLabel('标准', 'standard'),
  amount: previewLabel('金额', 'amount'),
};
