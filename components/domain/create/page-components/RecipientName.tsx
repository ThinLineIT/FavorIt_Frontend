import React from 'react';
import styled from '@emotion/styled';
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

interface UploadFormRecipientName {
  recipient_name: string;
}

const RecipientName = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormRecipientName>();
  const watchTitle = watch('recipient_name');
  const onValid = (data: UploadFormRecipientName) => {
    setFundingForm((prev: addFundFormType) => ({
      ...prev,
      recipient_name: data.recipient_name,
    }));
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        name="recipient_name"
        label="받는 분 성함"
        placeholder="받으시는 분의 이름을 입력해주세요"
        register={register('recipient_name', {
          required: '입력된 텍스트가 없네요!',
          maxLength: {
            value: 20,
            message: '20자 까지 입력 가능해요',
          },
        })}
      />

      {errors?.recipient_name?.type === 'required' && (
        <ErrorMessage>{errors.recipient_name.message}</ErrorMessage>
      )}
      {errors?.recipient_name?.type === 'maxLength' && (
        <ErrorMessage>{errors.recipient_name.message}</ErrorMessage>
      )}

      {watchTitle != null && <NextButton type="submit">다음</NextButton>}
    </Form>
  );
};

export default RecipientName;

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
