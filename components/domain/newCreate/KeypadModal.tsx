import { Portal } from '@components/base';
import Dimmer from '@components/base/Dimmer';
import Keypad from '@components/base/Keypad';
import styled from '@emotion/styled';

interface KeypadModalProps {
  closeModal: () => void;
  handleKeyClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function KeypadModal({
  closeModal,
  handleKeyClick,
}: KeypadModalProps) {
  return (
    <Portal>
      <Dimmer>
        <ModalBox>
          <CloseIcon onClick={closeModal}>x</CloseIcon>
          <Keypad onClick={handleKeyClick} />
        </ModalBox>
      </Dimmer>
    </Portal>
  );
}

const ModalBox = styled.dialog`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45vh;
  border-radius: 12px 12px 0 0;
  padding: 10px 0;
  background-color: #fff;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: block;
  border: none;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;
