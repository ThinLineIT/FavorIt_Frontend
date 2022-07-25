import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getUserAccessToken, getKakaoAccessToken } from '@apis/auth';
import { COOKIE } from '@util/cookie';
import { setCookie } from 'cookies-next';

const Redirect: NextPage = () => {
  const router = useRouter();

  const getAccessToken = async (code: string) => {
    const kakaoAccessToken = await getKakaoAccessToken(code);
    if (!kakaoAccessToken) {
      router.push('/404');
      return;
    }
    const userToken = await getUserAccessToken(kakaoAccessToken);
    if (!userToken) {
      router.push('/404');
      return;
    }
    setCookie(COOKIE.ACCESS_TOKEN, userToken.accessToken, {
      maxAge: COOKIE.ACCESS_MAX_AGE,
    });
    setCookie(COOKIE.REFRESH_TOKEN, userToken.refreshToken, {
      maxAge: COOKIE.REFRESH_MAX_AGE,
    });
    history.go(-2);
  };

  useEffect(() => {
    const code = router.asPath.split('?code=')[1];
    getAccessToken(code);
  }, []);
  // TODO 로딩 화면 디자인 요청
  return <div>로그인 중입니다 잠시만 기다려주세요</div>;
};

export default Redirect;
