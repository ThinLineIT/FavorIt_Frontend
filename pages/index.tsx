import type { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { COOKIE } from '@util/cookie';

import { getCookie } from 'cookies-next';

import note from '@public/assets/images/Note.png';
import planarFigure from '@public/assets/images/Planarfigure.png';
import polaroid from '@public/assets/images/Polaroid.png';

const Home: NextPage = () => {
  const router = useRouter();

  const onClickNoteHandler = () => {
    router.push('/');
  };
  const onClickPlanarHandler = () => {
    router.push('/');
  };
  const onClickPolaroidHandler = () => {
    router.push('/');
  };

  return (
    <HomePage>
      <ImageWrapper>
        <Image src={note} onClick={onClickNoteHandler} />
      </ImageWrapper>
      <ImageWrapper>
        <Image src={planarFigure} onClick={onClickPlanarHandler} />
      </ImageWrapper>
      <ImageWrapper>
        <Image src={polaroid} onClick={onClickPolaroidHandler} />
      </ImageWrapper>
    </HomePage>
  );
};

const HomePage = styled.main`
  background-image: url('/assets/images/SplashCenterCrop.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

// TODO: 반응형
const ImageWrapper = styled.div`
  // position: absolute;
`;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookieToken = getCookie(COOKIE.ACCESS_TOKEN, { req, res });

  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      isRootApproach: true,
    },
  };
};
