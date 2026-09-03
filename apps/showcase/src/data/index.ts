export type { AnchorItem, CatalogItem, CatalogSection, ScaleSemanticGroup } from './types';

export * from './tokens';
export * from './components';
export {
  scenesCatalog,
  listFieldSceneSlugs,
  isListFieldSceneSlug,
  legacyListFieldsSlug,
  sceneAnchorItems,
  defaultSceneSlug,
  findSceneCatalogChildPage,
  findSceneCatalogItem,
  getSceneRouteSlug,
  isValidSceneSlug,
  iterSceneCatalogItems,
} from './scenes';
export type { ListFieldSceneSlug } from './scenes';

import { componentCatalog } from './components';
import { scenesCatalog } from './scenes';

/** @deprecated Use componentCatalog or scenesCatalog directly. */
export const catalog = [...componentCatalog, ...scenesCatalog];
