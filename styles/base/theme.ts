/* Based on FavorIt Web Design System */
import { Theme } from '@emotion/react';

const palette = {
  black: '#000',
  dark: '#191a20',
  primary: '#E6F6FF',
  secondary: '#FFFBA7',
  tertiary: '#FDA2E3',

  border: '#e0e2e7',
  background: '#f7f8fa',
  white: '#fff',

  green: '#22c58b',
  orange: '#FFB84E',
  pink_matte: '#EFB2B2',
  blue_dark: '#92D2FF',

  kakao: '#FEE502',
} as const;

const zIndexes = {
  gnb_level: 50,
  overlay_level: 100,
  sidebar_level: 200,
  modal_level: 500,
  toast_level: 600,
} as const;

export type PaletteTypes = typeof palette;
export type PaletteKeyTypes = keyof typeof palette;
export type ZIndexesTypes = typeof zIndexes;

const theme: Theme = {
  palette,
  zIndexes,
};

export default theme;
