import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { flexbox } from '@styles/mixins/_flexbox';
import { Input, ErrorMessage, Button } from '@components/base';
import {
  smoothAppearDownUp,
  smoothAppearDownUpLarge,
} from '@styles/modules/_keyframes';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { btn48, btnPrimary } from '@styles/modules/_buttons';

interface UploadFormTitle {
  name: string;
}

const Title = () => {
  const setFundingForm = useSetRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormTitle>();
  const watchTitle = watch('name');
  const onValid = (data: UploadFormTitle) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      name: data.name,
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('name', {
            required: true,
            maxLength: {
              value: 20,
              message: '20자 까지 입력 가능해요',
            },
          })}
          name="title"
          label="펀딩 제목"
          placeholder="펀딩 제목을 입력해주세요"
        />

        {errors?.name?.type === 'maxLength' && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
        <br />

        {watchTitle != null && <NextButton type="submit">다음</NextButton>}
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
