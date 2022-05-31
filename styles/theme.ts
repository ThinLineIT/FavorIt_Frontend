/* Based on FavorIt Web Design System */

const palette = {
  // Color
  // //  Default(white, black)
  // // Color1
  // // Color2
  // // Grey
  // // Enterprise
  // facebook: '#397DFF',
  // kakao: '#FFD866',
  // instagram: '',
} as const;

const fontSize = {
  //
} as const;

const fontWeight = {
  //
} as const;

const lineHeight = {
  //
} as const;

const letterSpacing = {
  //
} as const;

const textStyle = {
  //
} as const;

export type PaletteTypes = typeof palette;
export type PaletteKeyTypes = keyof typeof palette;
export type TextStyleTypes = typeof textStyle;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;
export type LineHeightTypes = typeof lineHeight;

const theme = {
  palette,
  textStyle,
  fontSize,
  fontWeight,
  lineHeight,
};

export default theme;
