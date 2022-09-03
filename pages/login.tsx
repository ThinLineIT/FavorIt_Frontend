import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import kakaoBtn from '@public/assets/kakao/kakao_login_medium_narrow_en.png';

import { userInfo } from '@recoil/user';
import { useRecoilState } from 'recoil';

import { setCookie } from 'cookies-next';

const Login: NextPage = () => {
  // TODO 기본적인 회원 정보를 가져옵니다
  const [userInfoValue, setUserInfoValue] = useRecoilState(userInfo);
  const router = useRouter();

  const moveToKakakLogin = () => {
    // router.push(
    //   `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`,
    // );
    console.log('쿠키 저장');
    setCookie('COOKIE', 'test', {
      maxAge: 50000,
    });
    router.push('/');
  };

  return (
    <LoginPage>
      <h1>간편 로그인</h1>
      <p>
        <Image onClick={moveToKakakLogin} src={kakaoBtn} alt="kakao login" />
      </p>
    </LoginPage>
  );
};

const LoginPage = styled.article`
  position: absolute;
  z-index: 2;
`;

export default Login;
