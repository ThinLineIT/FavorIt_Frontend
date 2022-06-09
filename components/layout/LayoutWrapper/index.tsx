import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import PATH from 'constants/path';
import { Header } from '@components/base';
import BottomNavigation from '../BottomNavigation';
import { columnFlexbox } from '@styles/mixins/_flexbox';
import { isBottomNavigation } from '@recoil/layout/navigator';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { asPath } = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBottomNav = useRecoilValue(isBottomNavigation);

  //@Note 페이지 이동 시에도 항상 스크롤 맨 위 고정
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    });
  }, [asPath]);

  return (
    <Wrapper ref={scrollRef}>
      {asPath === PATH.Home && <Header />}
      {children}
      {isBottomNav && <BottomNavigation />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0 5px;
  background-color: #f1f4f6;
  ${columnFlexbox()};
  flex: 1 1 0%;
`;

export default LayoutWrapper;
