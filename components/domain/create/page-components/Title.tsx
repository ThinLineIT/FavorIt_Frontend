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
  animation: ${smoothAppearDownUpLarge} 700ms;
`;

interface UploadFormTitle {
  name: string;
}

const Title = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormTitle>();
  const onValid = (data: UploadFormTitle) => {
    setFundingForm((prev: addFundFormType) => ({
      ...prev,
      name: data.name.trim(),
    }));
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    if (fundingForm?.name !== '') {
      setValue('name', fundingForm?.name);
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      aria-labelledby="pagination-tab-3"
      aria-label="펀딩 제목 입력"
    >
      <Input
        register={register('name', {
          required: '입력된 텍스트가 없네요!',
          maxLength: {
            value: 20,
            message: '20자 까지 입력 가능해요',
          },
        })}
        name="title"
        label="펀딩 제목"
        placeholder="펀딩 제목을 입력해주세요"
      />

      {errors?.name?.type === 'required' && (
        <ErrorMessage>{errors.name.message}</ErrorMessage>
      )}
      {errors?.name?.type === 'maxLength' && (
        <ErrorMessage>{errors.name.message}</ErrorMessage>
      )}
      <br />

      <NextButton type="submit">다음</NextButton>
    </Form>
  );
};

export default React.memo(Title);
