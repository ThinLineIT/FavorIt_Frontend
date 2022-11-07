import { Calendar, Portal } from '@components/base';
import Dimmer from '@components/base/Dimmer';
import styled from '@emotion/styled';
import { isShowModalState } from '@recoil/layout';
import { useRecoilValue } from 'recoil';

interface CalendarModalProps {
  startDate: Date | undefined;
  endDate: Date | null;
  closeModal: () => void;
  onChange: (dates: Date[]) => void;
}

export default function CalendarModal({
  startDate,
  endDate,
  closeModal,
  onChange,
}: CalendarModalProps) {
  const isModalMounted = useRecoilValue(isShowModalState);

  return (
    <Portal elementId="modal-root" mounted={!!isModalMounted}>
      <Dimmer>
        <ModalBox>
          <CloseIcon onClick={closeModal}>x</CloseIcon>
          <Calendar
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
          />
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
  z-index: 500;
  overscroll-behavior: contain;
  display: flex;
  justify-content: center;
  align-items: center;
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
