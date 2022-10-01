import type { GetServerSideProps } from 'next';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
      <ImageWrapper top={63} left={23.9} zIndex={1}>
        <Image src={album} onClick={onClickPlanarHandler} alt="Album" />
      </ImageWrapper>
      <ImageWrapper top={60} left={71} zIndex={0}>
        <Image src={note} onClick={onClickNoteHandler} alt="note" />
      </ImageWrapper>
      <ImageWrapper top={39} left={6.7} zIndex={0}>
        <Image src={polaroid} onClick={onClickPolaroidHandler} alt="polaroid" />
      </ImageWrapper>
      <ImageWrapper top={60} left={2} zIndex={0}>
        <Image src={camera} onClick={onClickPolaroidHandler} alt="camera" />
      </ImageWrapper>
    </HomePage>
  );
};

const HomePage = styled.main`
  background-image: url('/assets/images/SplashCenterCrop.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  height: 100%;
`;

// TODO: 반응형
interface ImagePositionProps {
  top: number;
  left: number;
  zIndex: number;
}
const ImageWrapper = styled.div<ImagePositionProps>`
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  z-index: ${(props) => props.zIndex};
`;

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.skip) {
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
