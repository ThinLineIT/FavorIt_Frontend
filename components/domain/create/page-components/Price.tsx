import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { isFundingForm, isLocalGenerator } from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { addFundFormType, formGeneratorType } from '@apis/@types/fund';
import { deleteComma } from '@util/helper/formatter';
import Keypad from '@components/base/Keypad';
import useKeypads from '@hooks/useKeypads';
import { flexbox } from '@styles/mixins/_flexbox';

interface UploadFormPrice {
  price: string;
}

const Price = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const { handleSubmit } = useForm<UploadFormPrice>();
  const { value, setValue, handleKeyClick } = useKeypads(true);
  const onValid = () => {
    const purePrice = Number(deleteComma(value));
    setFundingForm((prev: addFundFormType) => ({
      ...prev,
      product: { ...prev.product, price: purePrice },
    }));
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleGoBack = () => {
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  useEffect(() => {
    if (fundingForm?.product?.price !== 0) {
      setValue(
        (fundingForm?.product?.price).toLocaleString('en', {
          maximumFractionDigits: 3,
        }),
      );
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      role="tabpanel"
      aria-label="상품 가격 입력"
      aria-labelledby="pagination-tab-2"
      onSubmit={handleSubmit(onValid)}
    >
      <InputWrapper price={Boolean(value)}>
        <CustomInput price={Boolean(value)}>
          {value ? value : '펀딩 목표액을 입력해주세요!'}
        </CustomInput>
        <PriceLabel>{value ? `${value}원` : ''}</PriceLabel>
      </InputWrapper>
      <ButtonGroup>
        <CustomGoBack type="button" onClick={handleGoBack}>
          이전
        </CustomGoBack>
        <CustomGoNext disabled={!value}>다음</CustomGoNext>
      </ButtonGroup>
      <CustomKeypad onClick={handleKeyClick} />
    </Form>
  );
};

export default React.memo(Price);

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  animation: ${smoothAppearDownUp} 300ms;
`;

const InputWrapper = styled.div<{ price?: boolean }>`
  position: relative;
  ${flexbox('start', 'center')};
  width: 80%;
  height: 30px;
  margin-left: 39px;
  padding-left: ${({ price }) => (price ? '0' : '8px')};
  border-left: ${({ price }) => (price ? 'none' : '2px solid black')};
`;

const CustomInput = styled.span<{
  price?: boolean;
}>`
  font-weight: ${({ price }) => (price ? 500 : 400)};
  font-size: ${({ price }) => (price ? '28px' : '18px')};
  line-height: ${({ price }) => (price ? '34px' : '22px')};
  color: ${({ price }) => (price ? 'black' : '#727272')};
`;

const PriceLabel = styled.span`
  position: absolute;
  display: block;
  bottom: -12px;
  width: 200px;
  height: 10px;
  color: #727272;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  ${flexbox('between', 'center')};
  z-index: 10;
  width: 100%;
  height: 4rem;
  bottom: 300px;
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
  font-weight: 700;
  font-size: 17px;
  line-height: 11px;
  color: ${({ disabled }) => (disabled ? 'lightgray' : '#92d2ff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const CustomKeypad = styled(Keypad)`
  /* width: 100vw; */
`;
