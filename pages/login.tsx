import type { GetServerSideProps } from 'next';
import type { NextPage, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { getCookie } from 'cookies-next';

import kakaoBtn from '@public/assets/images/KakaoButton.png';

import { COOKIE } from '@util/cookie';

const Login: NextPage = ({
  authorized,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const timerRef = useRef<number | null>(null);

  const moveToKakakLogin = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`,
    );
  };

  useEffect(() => {
    if (authorized) {
      timerRef.current = window.setTimeout(() => {
        router.push('/animate');
      }, 2000);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <LoginPage>
      {!authorized && (
        <KakaoLoginButton onClick={moveToKakakLogin}>
          <Image src={kakaoBtn} alt="kakao login" />
        </KakaoLoginButton>
      )}
    </LoginPage>
  );
};

const LoginPage = styled.main`
  background-image: url('/assets/images/Login.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
`;

const KakaoLoginButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4%;
`;

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookieToken = getCookie(COOKIE.ACCESS_TOKEN, { req, res });
  return {
    props: {
      authorized: cookieToken ? true : false,
    },
  };
};
