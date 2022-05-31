import { css } from '@emotion/react';

const avatarBase = css`
  display: block;
  overflow: hidden;
  background-image: url('/assets/images/img-user-default.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const avatar_24 = css`
  ${avatarBase};
  width: 24px;
  height: 24px;
`;

export const avatar_32 = css`
  ${avatarBase};
  width: 32px;
  height: 32px;
`;
