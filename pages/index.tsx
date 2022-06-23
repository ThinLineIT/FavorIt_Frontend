import Link from 'next/link';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { Button } from '@components/base';
import { isFundingForm, isLocalGenerator } from '@recoil/create';
import { canGoBack } from '@recoil/layout/navigator';
import { LandingBox } from '@components/domain/home';
import { columnFlexbox } from '@styles/mixins/_flexbox';

const Main = styled.main`
  ${columnFlexbox('around', 'center')};
  row-gap: 12px;
  width: 100%;
  height: 100%;
  padding: 15px;

  > a {
    width: 100%;
  }
`;

const Home: NextPage = () => {
  const setCanGoBack = useSetRecoilState(canGoBack);
  const resetForm = useResetRecoilState(isFundingForm);
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);
  const useGenerate = () => {
    if (generator.proceed) {
      // @Note
      // 펀딩 만들던 곳으로 모셔다 드릴게요 => 라우팅
    }
    resetForm();
    setGenerator((prev) => ({
      ...prev,
      // proceed: true,
      done: false,
      page: 0,
    }));

    // @Note
    // generator.done === true 일 시, 유저는 모든 정보를 양식에 맞게 입력했으며, 펀딩 상세 페이지로 이동합니다.
    // generator.proceed === true 였다면, 유저가 이전에 작성했던 페이지까지로 이동합니다.
    // generator.proceed === false 였다면, 유저는 이전에 작성했던 적이 없으므로, 새로운 펀딩을 생성합니다.
    // 유저가 펀딩 생성을 완료하였을 때에도 generator === false로 세팅해줍니다.
  };

  useEffect(() => {
    setCanGoBack(false);
    return () => setCanGoBack(true);
  }, [setCanGoBack]);

  return (
    <>
      <Main>
        <LandingBox />
        <Link href="/fund/create">
          <a onClick={useGenerate} aria-hidden>
            <Button type="button" aria-label="펀딩 생성 버튼">
              펀딩 만들기
            </Button>
          </a>
        </Link>
      </Main>
    </>
  );
};

export default Home;
