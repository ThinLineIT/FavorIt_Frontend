import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import CanvasAnimation from '@util/background/CanvasAnimation';

const Animate: NextPage = () => {
  const canvasHtmlRef = useRef<HTMLCanvasElement>(null);
  const canvasObjectRef = useRef<CanvasAnimation>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const moveToMainPage = () => {
    router.push('/');
  };

  useEffect(() => {
    if (canvasHtmlRef.current && wrapperRef.current) {
      const backgroundCanvasInstance = new CanvasAnimation(
        canvasHtmlRef.current,
        wrapperRef.current,
        moveToMainPage,
      );
      canvasObjectRef.current = backgroundCanvasInstance;
    }
  }, []);

  return (
    <AnimationPage ref={wrapperRef}>
      <canvas ref={canvasHtmlRef}></canvas>
    </AnimationPage>
  );
};

const AnimationPage = styled.div`
  height: 100vh;
`;

export default Animate;
