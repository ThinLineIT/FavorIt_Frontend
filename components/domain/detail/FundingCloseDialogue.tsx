import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';

const FundingCloseDialogue = ({
  percentage,
  setIsFundingClosing,
}: {
  percentage: number;
  setIsFundingClosing: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <DialogueContent>
        목표 달성까지 {percentage}% 남았어요 <br />
        펀딩을 마감하시겠어요?
      </DialogueContent>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <SmallButton onClick={() => setIsFundingClosing(false)}>
          계속 진행
        </SmallButton>
        <SmallButton>펀딩 마감</SmallButton>
      </div>
    </>
  );
};

export default FundingCloseDialogue;

const DialogueContent = styled.p`
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  padding: 20px 0 35px 0;
`;

const SmallButton = styled.button`
  width: 150px;
  height: 49px;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  color: #ffb84e;
`;
