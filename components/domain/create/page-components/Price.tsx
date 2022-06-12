import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { flexbox } from '@styles/mixins/_flexbox';
import { Input, ErrorMessage } from '@components/base';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import {
  smoothAppearDownUp,
  smoothAppearDownUpLarge,
} from '@styles/modules/_keyframes';
import { btn48, btnPrimary } from '@styles/modules/_buttons';

interface UploadFormPrice {
  price: number;
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
  } = useForm<UploadFormPrice>();
  const watchPrice = watch('price');
  const onValid = (data: UploadFormPrice) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      product: { ...prev.product, price: data.price },
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.product?.price !== 0) {
      setValue('price', fundingForm?.product?.price);
    }
  }, [fundingForm, setValue]);

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('price', {
            required: '입력된 가격이 없네요!',
            pattern: {
              value: /^[0-9]+$/,
              message: '올바른 가격을 입력해 주세요',
            },
          })}
          name="price"
          kind="price"
          type="number"
          label="상품 가격"
          placeholder="0"
        />

        {errors?.price?.type === 'required' && (
          <ErrorMessage>{errors.price.message}</ErrorMessage>
        )}
        {errors?.price?.type === 'pattern' && (
          <ErrorMessage>{errors.price.message}</ErrorMessage>
        )}
        <br />

        {watchPrice != null && <NextButton type="submit">다음</NextButton>}
      </Form>
    </Base>
  );
};

export default Price;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  animation: ${smoothAppearDownUpLarge} 700ms;
`;
