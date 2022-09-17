import type { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { COOKIE } from '@util/cookie';

import { getCookie } from 'cookies-next';

import note from '@public/assets/images/Note.png';
import album from '@public/assets/images/Album.png';
import polaroid from '@public/assets/images/Polaroid.png';
import camera from '@public/assets/images/Camera.png';

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
      <ImageWrapper top={63} left={23.9}>
        <Image src={album} onClick={onClickPlanarHandler} alt="Album" />
      </ImageWrapper>
      <ImageWrapper top={60} left={71}>
        <Image src={note} onClick={onClickNoteHandler} alt="note" />
      </ImageWrapper>
      <ImageWrapper top={39} left={6.7}>
        <Image src={polaroid} onClick={onClickPolaroidHandler} alt="polaroid" />
      </ImageWrapper>
      <ImageWrapper top={60} left={2}>
        <Image src={camera} onClick={onClickPolaroidHandler} alt="camera" />
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
  position: relative;
`;

// TODO: 반응형
interface ImagePositionProps {
  top: number;
  left: number;
}
const ImageWrapper = styled.div<ImagePositionProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
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
