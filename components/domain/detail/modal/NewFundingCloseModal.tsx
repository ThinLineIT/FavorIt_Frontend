import React from 'react';
import styled from '@emotion/styled';

import useModal from '@hooks/useModal';
interface NewFundingCloseModalProps {
  id?: number | string;
}

function NewFundingCloseModal({ id }: NewFundingCloseModalProps) {
  const { closeModal } = useModal();
  const handleCloseFund = () => {
    console.log('asda');
  };

  return (
    <Root>
      <Desc>
        마감하면 더 이상 선물을 받을 수 없습니다.
        <AccentMsg>펀딩을 마감할까요?</AccentMsg>
      </Desc>
      <BtnGroup>
        <YesBtn onClick={handleCloseFund}>네, 마감할게요!</YesBtn>
        <PendingBtn type="button" onClick={closeModal}>
          아뇨! 계속 진행하고 싶어요!
        </PendingBtn>
      </BtnGroup>
    </Root>
  );
}

export default NewFundingCloseModal;

const Root = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-flow: column;
  width: 341px;
  height: 258px;
  padding: 22px 28px;
  background-color: white;
  z-index: 100;
  border-radius: 10px;
`;

const Desc = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  row-gap: 12px;
  width: 100%;
`;

const AccentMsg = styled.span`
  display: block;
  font-weight: 600;
`;

const BtnGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column;
  margin-top: 50px;
`;

const YesBtn = styled.button`
  display: inline-flex;
  height: 55px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
`;

const PendingBtn = styled.button`
  display: inline-flex;
  height: 55px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
`;
