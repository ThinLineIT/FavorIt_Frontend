import '@emotion/react';
import { PaletteTypes, ZIndexesTypes } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    palette: PaletteTypes;
    zIndexes: ZIndexesTypes;
  }
}
