import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import Input from '@components/base/Input';
import { flexbox } from '@styles/mixins/_flexbox';
import { isLocalGenerator } from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';

interface UploadProductForm {
  price: string;
}

const Price = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const onValid = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('price', {
            required: '올바른 가격을 입력해 주세요',
            pattern: {
              value: /^[0-9]+$/i,
              message: '올바른 가격을 입력해 주세요',
            },
          })}
          required
          label="Price"
          name="price"
          type="number"
          kind="price"
        />
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
  animation: ${smoothAppearDownUp} 700ms;
`;
