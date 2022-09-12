import { useRef, useEffect, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';

interface LayoutWrapperProps {
  children: ReactNode;
  path: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, path }) => {
  return <Wrapper></Wrapper>;
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
