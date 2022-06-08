import React, { ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';

interface IBoxStyle {
  backgroundColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  isFullWidth?: boolean;
}

interface BoxProps extends IBoxStyle, React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function Box({
  children,
  className,
  width = 0,
  height,
  backgroundColor = 'grey',
  borderRadius = 32,
  ...rest
}: BoxProps): ReactElement {
  return (
    <StyledBox
      {...rest}
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      className={className}
    >
      {children}
    </StyledBox>
  );
}

const StyledBox = styled.div<IBoxStyle>`
  width: ${({ isFullWidth, width }) => (isFullWidth ? '100%' : `${width}px`)};
  height: ${({ height }) => height}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: rgb(0 0 0 / 6%) 0px 10px 14px 0px,
    rgb(0 0 0 / 2%) 0px 32px 64px 0px, rgb(0 0 0 / 2%) 0px 0px 2px 0px;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
`;

export default Box;
