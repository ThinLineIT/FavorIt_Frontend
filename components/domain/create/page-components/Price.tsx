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
import { handlePriceType } from '@util/helper/formatter';

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

  const handlePrice = () => {
    const newPrice = handlePriceType(watchPrice);
    setValue('price', newPrice);
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
      role="tabpanel"
      aria-label="상품 가격 입력"
      aria-labelledby="pagination-tab-2"
      onSubmit={handleSubmit(onValid)}
    >
      <Input
        type="text"
        name="price"
        label="상품 가격"
        placeholder="0"
        onKeyUp={handlePrice}
        register={register('price', {
          required: '입력된 가격이 없네요!',
          pattern: {
            value: /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/,
            message: '올바른 가격을 입력해 주세요',
          },
        })}
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
