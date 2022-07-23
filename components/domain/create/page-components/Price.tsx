import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Input, ErrorMessage } from '@components/base';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { isFundingForm, isLocalGenerator } from '@recoil/create';
import {
  smoothAppearDownUp,
  smoothAppearDownUpLarge,
} from '@styles/modules/_keyframes';
import { addFundFormType, formGeneratorType } from '@apis/@types/fund';

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;
const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  margin-top: 25px;
  animation: ${smoothAppearDownUpLarge} 700ms;
`;

interface UploadFormPrice {
  price: string;
}

const Price = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormPrice>({ mode: 'onChange' });
  const watchPrice = watch('price');
  const onValid = (data: UploadFormPrice) => {
    const purePrice = Number(data.price.split(',').join(''));
    setFundingForm((prev: addFundFormType) => ({
      ...prev,
      product: { ...prev.product, price: purePrice },
    }));
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };
  // @Note
  // 재사용성을 위해 추후 분리할 예정
  const handlePriceType = (watch: string) => {
    const comma = (str: string) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };

    const unComma = (str: string) => {
      str = String(str);
      return str.replace(/[^\d]+/g, '');
    };

    const pureString = watch && comma(unComma(watch));
    setValue('price', pureString);
  };

  useEffect(() => {
    if (fundingForm?.product?.price !== 0) {
      setValue(
        'price',
        (fundingForm?.product?.price).toLocaleString('en', {
          maximumFractionDigits: 3,
        }),
      );
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      aria-labelledby="pagination-tab-2"
      aria-label="상품 가격 입력"
    >
      <Input
        register={register('price', {
          required: '입력된 가격이 없네요!',
          pattern: {
            value: /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/,
            message: '올바른 가격을 입력해 주세요',
          },
        })}
        name="price"
        kind="price"
        type="text"
        label="상품 가격"
        placeholder="0"
        onKeyUp={() => handlePriceType(watchPrice)}
      />

      {errors?.price?.type === 'required' && (
        <ErrorMessage>{errors.price.message}</ErrorMessage>
      )}
      {errors?.price?.type === 'pattern' && (
        <ErrorMessage>{errors.price.message}</ErrorMessage>
      )}
      <NextButton type="submit">다음</NextButton>
    </Form>
  );
};

export default React.memo(Price);
