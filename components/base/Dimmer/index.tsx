import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import React from 'react';

interface DimmerProps {
  children: React.ReactNode;
  isAbleClick?: boolean;
}

const Dimmer: React.FC<DimmerProps> = ({ children, isAbleClick = true }) => {
  const { closeModal } = useModal();

  const onClickDimmed = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target && isAbleClick) closeModal();
  };

  return <Dimmed onClick={onClickDimmed}>{children}</Dimmed>;
};

export default Dimmer;

export const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #00000080;
`;
