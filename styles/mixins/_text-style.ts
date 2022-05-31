import { css } from '@emotion/react';

const fontSize12 = '12px';
const lineHeight12 = '16px';
const letterSpacing12 = '-0.005em';

const fontSize13 = '13px';
const lineHeight13 = '20px';
const letterSpacing13 = '-0.01em';

const fontSize14 = '14px';
const lineHeight14 = '24px';
const letterSpacing14 = '-0.01em';

const fontSize16 = '16px';
const lineHeight16 = '24px';
const letterSpacing16 = '-0.01em';

const fontSize18 = '18px';
const lineHeight18 = '28px';
const letterSpacing18 = '-0.02em';

const fontSize24 = '24px';
const lineHeight24 = '34px';
const letterSpacing24 = '-0.01em';

const textStyle12 = css`
  font-size: ${fontSize12};
  line-height: ${lineHeight12};
  letter-spacing: ${letterSpacing12};
`;

const textStyle13 = css`
  font-size: ${fontSize13};
  line-height: ${lineHeight13};
  letter-spacing: ${letterSpacing13};
`;

const textStyle14 = css`
  font-size: ${fontSize14};
  line-height: ${lineHeight14};
  letter-spacing: ${letterSpacing14};
`;

const textStyle16 = css`
  font-size: ${fontSize16};
  line-height: ${lineHeight16};
  letter-spacing: ${letterSpacing16};
`;

const textStyle18 = css`
  font-size: ${fontSize18};
  line-height: ${lineHeight18};
  letter-spacing: ${letterSpacing18};
`;

const textStyle24 = css`
  font-size: ${fontSize24};
  line-height: ${lineHeight24};
  letter-spacing: ${letterSpacing24};
`;

type Size = 12 | 13 | 14 | 16 | 18 | 24;

export const textStyle = (size: Size, color?: string) => {
  function getValue(size: Size) {
    if (size === 12) return textStyle12;
    if (size === 13) return textStyle13;
    if (size === 14) return textStyle14;
    if (size === 16) return textStyle16;
    if (size === 18) return textStyle18;
    if (size === 24) return textStyle24;
  }

  return css`
    ${getValue(size)}
    color: ${color};
  `;
};
