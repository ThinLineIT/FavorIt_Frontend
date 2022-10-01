import { NextPage } from 'next';
import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const Animate: NextPage = () => {
  const animationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const router = useRouter();

  const checkAnimationState = useCallback((time: number) => {
    timerRef.current = window.setTimeout(() => {
      // TODO: 애니메이션 상태 확인
      //   if (animationRef.current) {
      //     const animationState = getComputedStyle(
      //       animationRef.current,
      //     ).animationPlayState;
      //     console.log(animationState);
      //   }
      router.push(`/?skip=${true}`);
    }, time);
  }, []);

  useEffect(() => {
    checkAnimationState(4500);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  return <AnimationPage ref={animationRef}></AnimationPage>;
};

const change = keyframes`
    0% {
        background-image: url('/assets/images/LoginCrop.png');
        filter: blur(0px);
    }
    17% {
        background-image: url('/assets/images/LoginCrop.png');
        filter: blur(0px);
    }
    22% {
      background-image: url('/assets/images/SplashLeft.png');
      filter: blur(10px);
    }
    27% {
        filter: blur(0px);
    }
    44% {
        filter: blur(0px);
        background-image: url('/assets/images/SplashLeft.png');
    }
    49% {
        background-image: url('/assets/images/SplashRight.png');
        filter: blur(10px);
    }
    66% {
        filter: blur(0px);
    }
    83% {
        filter: blur(0px);
        background-image: url('/assets/images/SplashRight.png');
    }
    86% {
        filter: blur(10px);
        background-image: url('/assets/images/SplashCenter.png');      
    }
    91% {
        filter: blur(0px);
    }
    100% {
        background-image: url('/assets/images/SplashCenter.png');  
        animation-play-state: paused;    
    }
`;

const AnimationPage = styled.div`
  animation: ${change} 4s linear;
  animation-fill-mode: forwards;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  animation-play-state: running;
`;

export default Animate;
