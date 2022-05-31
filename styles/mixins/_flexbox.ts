import { css } from '@emotion/react';

type FlexMapType =
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'stretch'
  | 'center';

const flexMap = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  stretch: 'stretch',
  center: 'center',
};

const getFlexValue = (key: FlexMapType): string => flexMap[key];

export const flexbox = (
  jc: FlexMapType = 'center',
  ai: FlexMapType = 'center',
) => css`
  display: flex;
  align-items: ${getFlexValue(ai)};
  justify-content: ${getFlexValue(jc)};
`;

export const inlineFlexbox = (
  jc: FlexMapType = 'center',
  ai: FlexMapType = 'center',
) => css`
  display: inline-flex;
  align-items: ${getFlexValue(ai)};
  justify-content: ${getFlexValue(jc)};
`;

export const columnFlexbox = (
  jc: FlexMapType = 'center',
  ai: FlexMapType = 'center',
) => css`
  display: flex;
  flex-direction: column;
  align-items: ${getFlexValue(ai)};
  justify-content: ${getFlexValue(jc)};
`;
