export type CatalogChildItem = {
  id: string;
  label: string;
};

export type CatalogItem = {
  name: string;
  slug: string;
  description: string;
  status?: 'implemented' | 'placeholder';
  children?: CatalogChildItem[];
};

export type CatalogSection = {
  title: string;
  items: CatalogItem[];
  groups?: Array<{ title: string; items: CatalogItem[] }>;
};

export type AnchorItem = {
  id: string;
  label: string;
  depth?: 1 | 2 | 3;
  parentSlug?: string;
  anchorId?: string;
};

export type ScaleSemanticGroup = {
  title: string;
  match: (name: string) => boolean;
};
