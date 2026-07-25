import type { AnchorItem, CatalogSection } from '../types';
import { componentCatalog } from './catalog';

export function catalogSectionId(title: string) {
  return title.toLowerCase();
}

export function buildComponentAnchorItems(catalog: CatalogSection[]): AnchorItem[] {
  const items: AnchorItem[] = [];

  for (const section of catalog) {
    items.push({
      id: catalogSectionId(section.title),
      label: section.title,
      depth: 1,
    });

    if (section.groups) {
      for (const group of section.groups) {
        for (const item of group.items) {
          items.push({
            id: item.slug,
            label: item.name,
            depth: 2,
          });

          for (const child of item.children ?? []) {
            items.push({
              id: `${item.slug}:${child.id}`,
              label: child.label,
              depth: 3,
              parentSlug: item.slug,
              anchorId: child.id,
            });
          }
        }
      }
    } else {
      for (const item of section.items) {
        items.push({
          id: item.slug,
          label: item.name,
          depth: 2,
        });

        for (const child of item.children ?? []) {
          items.push({
            id: `${item.slug}:${child.id}`,
            label: child.label,
            depth: 3,
            parentSlug: item.slug,
            anchorId: child.id,
          });
        }
      }
    }
  }

  return items;
}

export const componentAnchorItems = buildComponentAnchorItems(componentCatalog);
