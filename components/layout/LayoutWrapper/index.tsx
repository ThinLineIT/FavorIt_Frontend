import { useRef, useEffect, useState, ReactNode } from 'react';
import styled from '@emotion/styled';
import useRouterEvent from '@hooks/useRouter';
import Canvas from '@util/background/mainBackground';
import { useRouter } from 'next/router';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const canvasHtmlRef = useRef<HTMLCanvasElement>(null);
  const canvasObjectRef = useRef<Canvas>();

  const { url, router } = useRouterEvent();

  const moveToCreate = () => {
    router.push('/fund/create');
  };

  useEffect(() => {
    if (canvasHtmlRef.current !== null) {
      const backgroundCanvasInstance = new Canvas(
        canvasHtmlRef.current,
        moveToCreate,
      );
      canvasObjectRef.current = backgroundCanvasInstance;
    }
  }, []);

  useEffect(() => {
    if (canvasObjectRef.current) {
      switch (url) {
        case '/login':
          canvasObjectRef.current.drawLoginBackground();
          console.log('현재 URL은 로그인');
          break;
        case '/':
          console.log('현재 URL은 메인');
          canvasObjectRef.current.drawMainBackground(true);
          // canvasObjectRef.current.drawCropedMainBackground();
          break;
        case '':
          console.log('현재 URL은 공백입니다');
        default:
          break;
      }
    }
  }, [url]);

  return (
    <Wrapper>
      {children}
      <canvas ref={canvasHtmlRef} id="fabric"></canvas>
    </Wrapper>
  );
};

export default LayoutWrapper;

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  min-width: 320px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  background-image: url('/assets/images/background.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12);
`;
