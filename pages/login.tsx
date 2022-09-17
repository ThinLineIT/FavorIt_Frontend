import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import kakaoBtn from '@public/assets/images/KakaoButton.png';

import { userInfo } from '@recoil/user';
import { useRecoilState } from 'recoil';

const Login: NextPage = () => {
  const [userInfoValue, setUserInfoValue] = useRecoilState(userInfo);
  const router = useRouter();

  const moveToKakakLogin = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`,
    );
    router.push('/');
  };

  return (
    <LoginPage>
      <KakaoLoginButton onClick={moveToKakakLogin}>
        <Image src={kakaoBtn} alt="kakao login" />
      </KakaoLoginButton>
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
