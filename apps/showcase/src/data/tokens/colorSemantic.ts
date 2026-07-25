import type { ScaleSemanticGroup } from '../types';

export const colorSemanticGroups: ScaleSemanticGroup[] = [
  { title: 'Box', match: (name) => name.startsWith('box-') },
  { title: 'Event', match: (name) => name.startsWith('event-') },
  { title: 'Status', match: (name) => name.startsWith('status-') },
  { title: 'Stroke', match: (name) => name.startsWith('stroke-') },
  { title: 'Text', match: (name) => name.startsWith('text-') },
  { title: 'Material', match: (name) => name.startsWith('material-') },
  { title: 'Data Table', match: (name) => name.startsWith('data-table-') },
  { title: 'Effect', match: (name) => name.startsWith('effect-') },
];
