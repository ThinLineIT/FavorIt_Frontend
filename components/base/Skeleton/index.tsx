import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface Props {
  width?: number;
  height?: number;
  circle?: boolean; // 원형 스켈레톤 true or false
  rounded?: boolean; // border-rounded true or false
  count?: number; // width, height 지정되어 있지 않고 inline일 때, 글자의 개수
  unit?: string; //  픽셀이나 퍼센트 등의 단위
  animation?: boolean; // 애니메이션 유무
  color?: string; // 스켈레톤의 배경색
  style?: React.CSSProperties; // 추가적인 스타일링 객체
  children?: React.ReactNode;
}

const pulseKeyframe = keyframes`
  0%{
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out infinite;
`;

const Base = styled.div<Props>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ rounded }) => rounded && 'border-radius: 8px'};
  ${({ circle }) => circle && 'border-radius: 50%'};
  ${({ width, height }) => (width || height) && 'display: block'};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`;

const Content = styled.span`
  opacity: 0;
`;

const Skeleton: React.FC<Props> = ({
  animation = true,
  children,
  width,
  height,
  circle,
  rounded,
  count,
  unit = 'px',
  color = '#F4F4F4',
  style,
}) => {
  // count 4 => '----'
  // count 6 => '----'
  const content = useMemo(
    () => [...Array({ length: count })].map(() => '-').join(''),
    [count],
  );

  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      unit={unit}
      color={color}
    >
      <Content>{children || content}</Content>
    </Base>
  );
};

export default Skeleton;
