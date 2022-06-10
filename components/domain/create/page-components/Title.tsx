import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import Input from '@components/base/Input';
import { flexbox } from '@styles/mixins/_flexbox';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { generatorType, isLocalGenerator } from '@recoil/create';

interface UploadFormTitle {
  item_title: string;
}

const Title = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormTitle>();
  const onValid = (data: UploadFormTitle) =>
    setGenerator((prev: generatorType) => ({ ...prev, page: prev.page + 1 }));

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('item_title', {
            required: true,
            maxLength: {
              value: 20,
              message: '20자 까지 입력 가능해요',
            },
          })}
          required
          label="Title"
          labelHidden
          name="title"
          type="text"
          kind="text"
          placeholder="펀딩 타이틀을 입력해주세요!"
        />
        <div style={{ width: '100px', height: '100px', color: 'red' }}>
          {errors?.item_title?.type === 'maxLength' &&
            errors.item_title.message}
        </div>
      </Form>
    </Base>
  );
};

export default Title;

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
