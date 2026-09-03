import type { AnchorItem } from '../types';
import { colorSemanticGroups } from './colorSemantic';
import { scaleSemanticGroups, toAnchorId } from './scaleSemantic';

const colorSemanticAnchorItems: AnchorItem[] = colorSemanticGroups.map((group) => ({
  id: toAnchorId('color-semantic', group.title),
  label: group.title,
  depth: 2,
}));

const scaleSemanticAnchorItems: AnchorItem[] = scaleSemanticGroups.map((group) => ({
  id: toAnchorId('scale-semantic', group.title),
  label: group.title,
  depth: 2,
}));

export const tokenAnchorItems: AnchorItem[] = [
  { id: 'color-base', label: 'Color Base' },
  { id: 'color-semantic', label: 'Color Semantic' },
  ...colorSemanticAnchorItems,
  { id: 'scale-base', label: 'Scale Base' },
  { id: 'scale-semantic', label: 'Scale Semantic' },
  ...scaleSemanticAnchorItems,
  { id: 'typography-base', label: 'Typography Base' },
  { id: 'typography-semantic', label: 'Typography Semantic' },
  { id: 'text-style', label: 'Text Style' },
  { id: 'motion-base', label: 'Motion Base' },
  { id: 'motion-recipe', label: 'Motion Recipe' },
  { id: 'motion-semantic', label: 'Motion Semantic' },
  { id: 'effect-base', label: 'Effect Base' },
  { id: 'effect-semantic', label: 'Effect Semantic' },
];

export const tokenSections = [
  { id: 'color-base', title: 'Color Base' },
  { id: 'color-semantic', title: 'Color Semantic' },
  { id: 'scale-base', title: 'Scale Base' },
  { id: 'scale-semantic', title: 'Scale Semantic' },
  { id: 'typography-base', title: 'Typography Base' },
  { id: 'typography-semantic', title: 'Typography Semantic' },
  { id: 'text-style', title: 'Text Style' },
  { id: 'motion-base', title: 'Motion Base' },
  { id: 'motion-recipe', title: 'Motion Recipe' },
  { id: 'motion-semantic', title: 'Motion Semantic' },
  { id: 'effect-base', title: 'Effect Base' },
  { id: 'effect-semantic', title: 'Effect Semantic' },
] as const;
