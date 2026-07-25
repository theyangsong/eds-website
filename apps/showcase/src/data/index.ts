export type { AnchorItem, CatalogItem, CatalogSection, ScaleSemanticGroup } from './types';

export * from './tokens';
export * from './components';
export * from './scenes';

import { componentCatalog } from './components';
import { scenesCatalog } from './scenes';

/** @deprecated Use componentCatalog or scenesCatalog directly. */
export const catalog = [...componentCatalog, ...scenesCatalog];
