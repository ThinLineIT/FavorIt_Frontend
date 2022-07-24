import { useRef, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import PATH from '@constants/path';
import { Header } from '@components/base';
import { canGoBack, isMainFullHeight } from '@recoil/layout';
import { smoothAppearUpDown } from '@styles/modules/_keyframes';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { asPath } = useRouter();
  const isTopGoBack = useRecoilValue(canGoBack);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isFullHeight, setIsFullHeight] = useRecoilState(isMainFullHeight);

  // //@Note 페이지 이동 시에도 항상 스크롤 맨 위 고정
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    });
  }, [asPath]);

  useEffect(() => {
    asPath === PATH.Home && setIsFullHeight(false);
  }, [asPath, setIsFullHeight]);

  return (
    <Wrapper ref={scrollRef}>
      {asPath === PATH.Home && <Header />}
      <Base
        asPath={asPath}
        isTopGoBack={isTopGoBack}
        isFullHeight={isFullHeight}
      >
        {asPath === PATH.Home && (
          <Divider onClick={() => setIsFullHeight((prev) => !prev)} />
        )}
        {children}
      </Base>
    </Wrapper>
  );
};

export default LayoutWrapper;

const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;
  min-width: 320px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  background-image: url('/assets/images/background.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Base = styled.div<{
  isTopGoBack: boolean;
  asPath: string;
  isFullHeight: boolean;
}>`
  ${columnFlexbox()};
  flex-grow: 1;
  flex-shrink: 0;

  position: absolute;
  left: 0;
  bottom: 0;

  width: 100%;
  height: ${({ isFullHeight }) =>
    isFullHeight ? '100%' : 'calc(100% - 98px)'};

  background-color: #ffffff;
  border-radius: ${({ isFullHeight }) =>
    isFullHeight ? '0' : '50px 50px 0px 0px'};

  box-shadow: ${({ isFullHeight }) =>
    isFullHeight
      ? 'none'
      : `0px 4px 4px rgba(255, 255, 255, 0.25),
    inset 0px 4px 4px rgba(219, 219, 219, 0.25)`};

  transition: height 100ms ease-out, border-radius 100ms ease-out,
    box-shadow 100ms ease-out;

  // @Note 추후 수정
  // '/' 일 때마다 트랜지션될 필요 없음. 최초의 componentWillMount 에서만 발생하게끔 해야됨
  animation: ${({ asPath }) =>
    asPath === PATH.Home
      ? css`
          ${smoothAppearUpDown} 700ms;
        `
      : ''};
`;

const Divider = styled.span`
  display: inline-block;
  z-index: ${({ theme }) => theme.zIndexes.toast_level};
  ${flexbox()};
  width: 100%;
  height: 45px;
  border-radius: 50px 50px 0px 0px;
  cursor: pointer;

  &::before {
    content: '';
    width: 125px;
    border: 1.5px solid lightgray;
    border-radius: 2px;
    opacity: 0.3;
    transition: opacity 300ms ease-in-out;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &:active {
    &::before {
      opacity: 1;
    }
  }
`;
