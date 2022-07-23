import React, { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { flexbox } from '@styles/mixins/_flexbox';
import Keypad from '@components/base/Keypad';
import useAddBanking from './hooks/useAddBanking';

const AddBankingForm = ({ code }: any) => {
  const router = useRouter();
  const {
    banks,
    isLoading,
    inputSuccess,
    isSuccess,
    handleSubmit,
    handleKeyClick,
    handleGoBack,
    handleUpdateForm,
    handleInputSuccess,
  } = useAddBanking({ router, code });

  console.log(code);
  console.log(banks);

  return (
    <>
      <InputWrapper>
        <CustomInput>
          {!inputSuccess
            ? banks !== ''
              ? banks
              : '계좌번호를 입력해주세요'
            : `받으시는 분이 홍길동 맞으실까요?`}
        </CustomInput>
        <PriceLabel>{banks}</PriceLabel>
      </InputWrapper>
      <ButtonGroup inputSuccess={inputSuccess}>
        <CustomGoBack onClick={!inputSuccess ? handleGoBack : handleUpdateForm}>
          이전
        </CustomGoBack>
        <CustomGoNext
          disabled={!banks}
          onClick={!inputSuccess ? handleInputSuccess : handleSubmit}
        >
          {!inputSuccess ? '다음' : '선물하기'}
        </CustomGoNext>
      </ButtonGroup>
      <CustomKeypad onClick={handleKeyClick} inputSuccess={inputSuccess} />
    </>
  );
};

export default AddBankingForm;

const bounce = keyframes`
  0% {
    transform: translate3d(0, 500px, 0);
    opacity: 0;
  }
  75% {
    transform: translate3d(0, 330px, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 300px, 0);
    opacity: 1;
  }
`;

const InputWrapper = styled.div<{ price?: boolean }>`
  width: 80%;
  height: 30px;
  margin-left: 33px;
  padding-left: 8px;
  position: relative;
  border-left: ${({ price }) => (price ? 'none' : '2px solid black')};
  ${flexbox('start', 'center')};
`;

const CustomInput = styled.span<{
  price?: boolean;
  inputSuccess?: boolean;
}>`
  font-weight: ${({ price }) => (price ? 500 : 400)};
  font-size: ${({ price }) => (price ? '28px' : '18px')};
  line-height: ${({ price }) => (price ? '34px' : '22px')};
  color: ${({ price }) => (price ? 'black' : 'lightgray')};
`;

const PriceLabel = styled.span`
  position: absolute;
  bottom: -30px;
  display: block;
  width: 200px;
  height: 10px;
  color: lightgray;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const ButtonGroup = styled.div<{ inputSuccess?: boolean }>`
  ${flexbox('between', 'center')};
  z-index: 10;
  width: 100%;
  height: 4rem;
  position: absolute;
  bottom: 300px;
  transform: ${({ inputSuccess }) =>
    inputSuccess ? 'translate3d(0, 300px, 0)' : ''};
  animation-name: ${({ inputSuccess }) => (inputSuccess ? bounce : '')};
  animation-duration: 1.8s;
  animation-iteration-count: initial;
  transition: transform 1s ease;
`;
const CustomGoBack = styled.button`
  flex: 50%;
  color: #92d2ff;
  font-weight: 700;
  font-size: 17px;
  line-height: 11px;
`;
const CustomGoNext = styled.button<{ disabled?: boolean }>`
  flex: 50%;
  color: ${({ disabled }) => (disabled ? 'lightgray' : '#92d2ff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 700;
  font-size: 17px;
  line-height: 11px;
`;

const CustomKeypad = styled(Keypad)<{ inputSuccess?: boolean }>`
  opacity: ${({ inputSuccess }) => (inputSuccess ? 0 : 1)};
  transform: ${({ inputSuccess }) =>
    inputSuccess ? 'translate3d(0, 100%, 0)' : 'translate3d(0, 0, 0)'};
  transition: opacity 1.2s ease, visibility 1.2s ease, transform 1.2s ease;
`;
