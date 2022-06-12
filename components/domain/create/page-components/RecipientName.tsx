import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { flexbox } from '@styles/mixins/_flexbox';
import { Input, ErrorMessage } from '@components/base';
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
    setFundingForm((prev: FormType) => ({
      ...prev,
      recipient_name: data.recipient_name,
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.recipient_name !== '') {
      setValue('recipient_name', fundingForm?.recipient_name);
    }
  }, [fundingForm, setValue]);

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('recipient_name', {
            required: '입력된 텍스트가 없네요!',
            maxLength: {
              value: 20,
              message: '20자 까지 입력 가능해요',
            },
          })}
          name="recipient_name"
          label="받는 분 성함"
          placeholder="받으시는 분의 이름을 입력해주세요"
        />

        {errors?.recipient_name?.type === 'required' && (
          <ErrorMessage>{errors.recipient_name.message}</ErrorMessage>
        )}
        {errors?.recipient_name?.type === 'maxLength' && (
          <ErrorMessage>{errors.recipient_name.message}</ErrorMessage>
        )}
        <br />

        {watchTitle != null && <NextButton type="submit">다음</NextButton>}
      </Form>
    </Base>
  );
};

export default RecipientName;

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
