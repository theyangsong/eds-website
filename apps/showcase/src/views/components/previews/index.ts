import type { Component } from 'vue';
import ButtonPreview from './ButtonPreview.vue';
import IconPreview from './IconPreview.vue';
import InputPreview from './InputPreview.vue';
import TogglePreview from './TogglePreview.vue';

export type ComponentPreviewEntry = {
  slug: string;
  title: string;
  component: Component;
};

export const componentPreviews: ComponentPreviewEntry[] = [
  { slug: 'input', title: 'Input', component: InputPreview },
  { slug: 'icons', title: 'Icon', component: IconPreview },
  { slug: 'button', title: 'Button', component: ButtonPreview },
  { slug: 'toggle', title: 'Toggle', component: TogglePreview },
];

export const componentPreviewBySlug = Object.fromEntries(
  componentPreviews.map((entry) => [entry.slug, entry]),
) as Record<string, ComponentPreviewEntry>;
