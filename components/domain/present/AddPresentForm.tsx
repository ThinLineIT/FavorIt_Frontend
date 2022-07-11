import React, { useEffect } from 'react';
import { NextRouter } from 'next/router';
import styled from '@emotion/styled';

import { flexbox } from '@styles/mixins/_flexbox';
import useAddPresent from './hooks/useAddPresent';
import Keypad from '@components/base/Keypad';

export type AddPresentFormProps = {
  router: NextRouter;
  fundId?: string | string[];
};

const AddPresentForm = ({ router, fundId }: AddPresentFormProps) => {
  const {
    price,
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
      router.replace('/');
    }
  }, [isSuccess, router]);

  return (
    <>
      <InputWrapper price={Boolean(price)}>
        <CustomInput price={Boolean(price)} inputSuccess={inputSuccess}>
          {!inputSuccess
            ? price !== ''
              ? price
              : '선물할 금액을 입력해주세요!'
            : `${price}원을 선물할까요?`}
        </CustomInput>
        <PriceLabel>{price ? `${price}원` : ''}</PriceLabel>
      </InputWrapper>
      <ButtonGroup inputSuccess={inputSuccess}>
        <CustomGoBack onClick={!inputSuccess ? handleGoBack : handleUpdateForm}>
          이전
        </CustomGoBack>
        <CustomGoNext
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
  z-index: 10;
  width: 100%;
  height: 4rem;
  position: absolute;
  bottom: ${({ inputSuccess }) => (inputSuccess ? '0px' : '300px')};
  ${flexbox('between', 'center')};
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
  /* overflow: hidden; */
  opacity: ${({ inputSuccess }) => (inputSuccess ? 0 : 1)};

  transition: opacity 200ms ease-in-out;
`;
