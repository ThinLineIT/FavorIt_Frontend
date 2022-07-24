import styled from '@emotion/styled';

const FundingCloseModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <CloseModal>
      <ModalDialog>
        펀딩 기간이 종료 되었습니다. <br /> [펀딩 마감]을 눌러 펀딩을
        마감해주세요
      </ModalDialog>
      <ConfirmButton onClick={onClose}>확인</ConfirmButton>
    </CloseModal>
  );
};

const CloseModal = styled.section`
  width: 87%;
  background-color: white;
  color: black;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 6px #ffb84e;
  border-radius: 27px;
`;

const ModalDialog = styled.p`
  text-align: center;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  padding: 31px 0 17px 0;
`;

const ConfirmButton = styled.button`
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  color: #ffb84e;
  width: 247px;
  height: 52px;
  margin: 0 auto 20px auto;
`;

export default FundingCloseModal;
