import type { ScaleSemanticGroup } from '../types';

export function toAnchorId(prefix: string, title: string) {
  return `${prefix}-${title.toLowerCase().replace(/\s+/g, '-')}`;
}

export const scaleSemanticGroups: ScaleSemanticGroup[] = [
  { title: 'Spacing', match: (name) => name.startsWith('spacing-') },
  { title: 'Radius', match: (name) => name.startsWith('radius-') },
  { title: 'Corner Smoothing', match: (name) => name === 'corner-smoothing' },
  { title: 'Blur', match: (name) => name.startsWith('blur-') },
  { title: 'Depth', match: (name) => name.startsWith('depth-') },
  {
    title: 'Icon Size',
    match: (name) => ['icon-sm', 'icon-md', 'icon-lg', 'icon-xl'].includes(name),
  },
  {
    title: 'Control Button',
    match: (name) => name.startsWith('control-button-'),
  },
  {
    title: 'Control Icon',
    match: (name) => name.startsWith('control-icon-'),
  },
  {
    title: 'Control Input',
    match: (name) => name.startsWith('control-input-'),
  },
];
