import { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';

import { Button } from '@components/base';
import { LandingBox } from '@components/domain/home';
import { columnFlexbox } from '@styles/mixins/_flexbox';

import { canGoBack } from '@recoil/layout/navigator';

const Home: NextPage = () => {
  const setCanGoBack = useSetRecoilState(canGoBack);

  useEffect(() => {
    setCanGoBack(false);
    return () => setCanGoBack(true);
  }, [setCanGoBack]);

  return (
    <>
      <Main>
        <LandingBox />
        <Button>펀딩 만들기</Button>
      </Main>
    </>
  );
};

export default Home;

const Main = styled.main`
  width: 100%;
  height: 50%;
  ${columnFlexbox('between', 'center')};
  row-gap: 12px;
  padding: 0 10px;
  margin-top: 15rem;
  font-weight: 700;
`;
