import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { errorAppear } from '@styles/modules/_keyframes';
import { textStyle } from '@styles/mixins/_text-style';

type Props = {
  children: ReactNode;
};

const ErrorMessage = ({ children }: Props) => {
  return <Error>{children}</Error>;
};

export default ErrorMessage;

const Error = styled.span`
  ${textStyle(12, '#F04452')}
  font-weight: 700;
  width: 100%;
  padding-top: 12px;
  padding-left: 1px;
  display: block;
  animation: ${errorAppear} 450ms;
`;
