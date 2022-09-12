import { useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getUserAccessToken, getKakaoAccessToken } from '@apis/auth';
import { COOKIE } from '@util/cookie';
import { setCookie } from 'cookies-next';
import styled from '@emotion/styled';

const Redirect: NextPage = () => {
  const router = useRouter();

  const timeout = useRef<NodeJS.Timeout | null>(null);

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
    timeout.current = setTimeout(() => {
      router.push('/animate');
    }, 500);
  };

  useEffect(() => {
    const code = router.asPath.split('?code=')[1];
    getAccessToken(code);
    return () => clearTimeout(timeout.current as NodeJS.Timeout);
  }, []);
  return <RedirectPage></RedirectPage>;
};

export default Redirect;

const RedirectPage = styled.div`
  background-image: url('/assets/images/LoginCrop.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;
