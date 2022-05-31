import { css } from '@emotion/react';

export const lineClamp = (line: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
