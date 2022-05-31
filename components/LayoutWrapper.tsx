import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Header, Footer, FloatingButton } from 'components';
import React, { ReactNode, useEffect, useRef } from 'react';

import PATH from 'constants/path';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const { asPath } = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

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
      {/* 로그인 섹션 혹은 인트로 섹션 */}
      {/* {asPath === PATH.Home && <LoginSection />} */}
      <Header />
      {children}
      <Footer />
      {/* <FloatingButton /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;
  height: 100vh;
  min-width: 375px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  flex: 1 1 0%;
  overflow: auto;
  padding-top: 3.75rem;
`;

export default LayoutWrapper;
