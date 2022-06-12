import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

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
  const setFundingForm = useSetRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    watch,
    register,
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

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('price', {
            required: '올바른 가격을 입력해 주세요',
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
  position: absolute;
  bottom: 125px;
  width: 125px;
  animation: ${smoothAppearDownUpLarge} 700ms;
`;
