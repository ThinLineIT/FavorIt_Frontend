import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import TextArea from '@components/base/TextArea';
import { flexbox } from '@styles/mixins/_flexbox';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { generatorType, isLocalGenerator } from '@recoil/create';

interface UploadFormDescription {
  description: string;
}

const Description = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormDescription>();

  const onValid = (data: UploadFormDescription) =>
    setGenerator((prev: generatorType) => ({ ...prev, page: prev.page + 1 }));

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register('description', {
            required: true,
            maxLength: {
              value: 100,
              message: '100자 까지 입력 가능해요',
            },
          })}
          required
          label="Option"
          labelHidden
          name="link"
          placeholder="펀딩 내용을 입력해주세요!"
        />
        <div style={{ width: '100px', height: '100px', color: 'red' }}>
          {errors?.description?.type === 'maxLength' &&
            errors.description.message}
        </div>
        <button>reply</button>
      </Form>
    </Base>
  );
};

export default Description;

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
