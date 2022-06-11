import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import PATH from '@constants/path';
import { Header } from '@components/base';
import { canGoBack } from '@recoil/layout/navigator';
import { columnFlexbox } from '@styles/mixins/_flexbox';
import { smoothAppearUpDown } from '@styles/modules/_keyframes';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { asPath } = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTopGoBack = useRecoilValue(canGoBack);

  // //@Note 페이지 이동 시에도 항상 스크롤 맨 위 고정
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    });
  }, [asPath]);

  return (
    <Wrapper ref={scrollRef} isTopGoBack={isTopGoBack} asPath={asPath}>
      {asPath === PATH.Home && <Header />}
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isTopGoBack: boolean; asPath: string }>`
  max-width: 640px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0 15px;
  background-color: #f1f4f6;
  ${columnFlexbox()};
  flex: 1 1 0%;
  margin-top: ${({ isTopGoBack }) => (isTopGoBack ? '3rem' : '0')};

  // @Note 추후 수정
  // '/' 일 때마다 트랜지션될 필요 없음. 최초의 componentWillMount 에서만 발생하게끔 해야됨
  animation: ${({ asPath }) =>
    asPath === PATH.Home
      ? css`
          ${smoothAppearUpDown} 700ms
        `
      : ''};
`;

export default LayoutWrapper;
