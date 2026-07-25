import type { CatalogItem, CatalogSection } from '../types';
import { componentCatalog } from './catalog';

export type CatalogItemLocation = {
  section: CatalogSection;
  item: CatalogItem;
};

export const defaultComponentSlug = 'icons';

export function getCatalogChildAnchorIds(slug: string): string[] {
  const entry = findCatalogItem(slug);
  return entry?.item.children?.map((child) => child.id) ?? [];
}

export function iterCatalogItems(
  catalog: CatalogSection[] = componentCatalog,
): CatalogItemLocation[] {
  const entries: CatalogItemLocation[] = [];

  for (const section of catalog) {
    if (section.groups) {
      for (const group of section.groups) {
        for (const item of group.items) {
          entries.push({ section, item });
        }
      }
    }

    for (const item of section.items) {
      entries.push({ section, item });
    }
  }

  return entries;
}

export function findCatalogItem(slug: string): CatalogItemLocation | undefined {
  return iterCatalogItems().find((entry) => entry.item.slug === slug);
}

export function isValidComponentSlug(slug: string): boolean {
  return findCatalogItem(slug) !== undefined;
}
