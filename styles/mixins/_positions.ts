import { css } from '@emotion/react';

type PositionType = 'fixed' | 'absolute';

export const posCenterX = (type: PositionType = 'absolute') => css`
  position: ${type};
  left: 50%;
  transform: translateX(-50%);
`;

export const posCenterY = (type: PositionType = 'absolute') => css`
  position: ${type};
  top: 50%;
  transform: translateY(-50%);
`;

export const posCenter = (type: PositionType = 'absolute') => css`
  position: ${type};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
