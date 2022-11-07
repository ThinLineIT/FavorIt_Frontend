import { useRef } from 'react';
import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import Portal from '@components/base/Portal';

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  max-width: 456px;
  position: absolute;
  width: 100%;
`;

export type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  selector?: string;
};

function Modal({ children, isOpen, onClose }: ModalProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      nodeRef={nodeRef}
      classNames="modal"
      unmountOnExit
    >
      <Portal elementId="modal-root" mounted={isOpen}>
        <Dim onClick={onClose} />
        <Container ref={nodeRef}>{children}</Container>
      </Portal>
    </CSSTransition>
  );
}

export default Modal;
