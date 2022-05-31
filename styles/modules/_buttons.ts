import { css } from '@emotion/react';
import { inlineFlexbox } from 'styles/mixins/_flexbox';
import { textStyle } from 'styles/mixins/_text-style';

// 임시 설정입니다. 추후 수정

export const btnBase = css`
  ${inlineFlexbox()};
  padding: 0 8px;
  font-weight: 700;
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

// NOTE: Button Styles
export const btnPrimary = css`
  ${btnBase};
  color: #fff;
  background-color: #3da5f5;
  transition: background-color 200ms ease-in-out;

  &:not(:disabled):hover {
    background-color: #3186c4;
  }
`;

export const btnSecondary = css`
  ${btnBase};
  color: #3f4150;
  background-color: #e0e2e7;
  transition: background-color 200ms ease-in-out;

  &:not(:disabled):hover {
    background-color: #b2b3b9;
  }
`;

export const btnOutlined = css`
  ${btnBase};
  color: #3da5f5;
  background-color: #fff;
  border: 1px solid #3da5f5;
  transition: background-color 200ms ease-in-out;

  &:not(:disabled):hover {
    background-color: #ecf6fe;
  }
`;

export const btnGhost = css`
  ${btnBase};
  color: #3f4150;
  background-color: transparent;
  transition: color 200ms ease-in-out;

  &:not(:disabled):hover {
    color: #8c8d96;
  }
`;

// NOTE: Button Sizes
export const btn32 = css`
  ${textStyle(14)};
  height: 32px;
`;

export const btn40 = css`
  ${textStyle(16)};
  height: 40px;
`;

export const btn48 = css`
  ${textStyle(16)};
  height: 48px;
`;

export const btn55 = css`
  ${textStyle(18)};
  height: 55px;
`;
