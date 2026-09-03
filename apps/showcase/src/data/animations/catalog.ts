import type { CatalogSection } from '../types';

export type AnimationCatalogMeta = {
  slug: string;
  name: string;
  description: string;
};

export const animationCatalogMeta: AnimationCatalogMeta[] = [
  {
    slug: 'verification-ring-dots',
    name: 'VerificationRingDots',
    description: '验证外圈点阵动画。',
  },
  {
    slug: 'business-success',
    name: 'BusinessSuccess',
    description: '业务成功完成动效。',
  },
  {
    slug: 'business-processing',
    name: 'BusinessProcessing',
    description: '业务处理中时间动效。',
  },
  {
    slug: 'ripple-pulse',
    name: 'RipplePulse',
    description: '波纹脉冲动画。',
  },
  {
    slug: 'mnemonic-verification',
    name: 'MnemonicVerification',
    description: '助记词校验中动画。',
  },
];

export const animationsCatalog: CatalogSection[] = [
  {
    title: 'Animations',
    items: animationCatalogMeta.map((entry) => ({
      name: entry.name,
      slug: entry.slug,
      description: entry.description,
      status: 'placeholder' as const,
    })),
  },
];

export const defaultAnimationSlug = animationCatalogMeta[0].slug;

export function findAnimationMeta(slug: string): AnimationCatalogMeta | undefined {
  return animationCatalogMeta.find((entry) => entry.slug === slug);
}

export function isValidAnimationSlug(slug: string): boolean {
  return findAnimationMeta(slug) !== undefined;
}
