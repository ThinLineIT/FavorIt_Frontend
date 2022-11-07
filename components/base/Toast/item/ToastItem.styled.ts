import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface ToastWrapperProps {
  isClosing: boolean;
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  ${({ isClosing }) => css`
    max-height: 0;
    overflow: visible;
    animation: 0.6s forwards ${isClosing ? scaleDown : scaleUp};

    & > div {
      animation: 0.3s forwards ${isClosing ? fadeOut : fadeIn};
    }

    &:not(:first-of-type) {
      margin-top: 4px;
    }
  `}
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 56px;
  padding: 0 32px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);

  & > span {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }
`;

const scaleUp = keyframes`
  from { max-height: 0;}
  to {max-height: 100px;}
`;

const scaleDown = keyframes`
  from { max-height: 100px;}
  to { max-height: 0;}
 `;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-100%);}
  to { opacity: 1; transform: translateY(0)}
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0)}
  to { opacity: 0; transform: translateY(100%)}
 `;
