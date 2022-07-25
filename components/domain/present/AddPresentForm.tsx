import React, { useEffect } from 'react';
import { NextRouter } from 'next/router';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { flexbox } from '@styles/mixins/_flexbox';
import useAddPresent from './hooks/useAddPresent';
import Keypad from '@components/base/Keypad';

export type AddPresentFormProps = {
  router: NextRouter;
  fundId: number;
  fundName?: string;
};

const AddPresentForm = ({ router, fundId, fundName }: AddPresentFormProps) => {
  const {
    value,
    isSuccess,
    inputSuccess,
    handleSubmit,
    handleKeyClick,
    handleGoBack,
    handleUpdateForm,
    handleInputSuccess,
  } = useAddPresent(router, fundId);

  useEffect(() => {
    if (isSuccess) {
      router.replace({
        pathname: '/fund/get-started',
        query: {
          present: 'presentSuccess',
          id: fundId,
          name: fundName,
          price: value,
        },
      });
    }
  }, [fundId, fundName, isSuccess, value, router]);

  return (
    <>
      <InputWrapper price={Boolean(value)}>
        <CustomInput price={Boolean(value)} inputSuccess={inputSuccess}>
          {!inputSuccess
            ? value !== ''
              ? value
              : '선물할 금액을 입력해주세요!'
            : `${value} 원을 선물할까요?`}
        </CustomInput>
        <PriceLabel>{value ? `${value}원` : ''}</PriceLabel>
      </InputWrapper>
      <ButtonGroup inputSuccess={inputSuccess}>
        <CustomGoBack onClick={!inputSuccess ? handleGoBack : handleUpdateForm}>
          이전
        </CustomGoBack>
        <CustomGoNext
          disabled={!value}
          onClick={!inputSuccess ? handleInputSuccess : handleSubmit}
        >
          {!inputSuccess ? '다음' : '선물하기'}
        </CustomGoNext>
      </ButtonGroup>
      <CustomKeypad onClick={handleKeyClick} inputSuccess={inputSuccess} />
    </>
  );
};

export default AddPresentForm;

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
  margin-top: 50px;
  margin-left: 38px;
  padding-left: ${({ price }) => (price ? '0' : '8px')};
  position: relative;
  border-left: ${({ price }) => (price ? 'none' : '2px solid black')};
  ${flexbox('start', 'center')};
`;

const CustomInput = styled.span<{
  price?: boolean;
  inputSuccess?: boolean;
}>`
  font-weight: ${({ price }) => (price ? 500 : 400)};
  font-size: ${({ price }) => (price ? '25px' : '18px')};
  line-height: ${({ price }) => (price ? '34px' : '22px')};
  color: ${({ price }) => (price ? 'black' : 'lightgray')};
`;

const PriceLabel = styled.span`
  position: absolute;
  bottom: -12px;
  display: block;
  width: 200px;
  height: 10px;
  color: #727272;
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
