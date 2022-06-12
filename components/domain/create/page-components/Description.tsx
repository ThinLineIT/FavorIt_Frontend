import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { flexbox } from '@styles/mixins/_flexbox';
import { TextArea, ErrorMessage, Button } from '@components/base';
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

interface UploadFormDescription {
  contents: string;
}

const Description = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormDescription>();
  const watchContents = watch('contents');
  const onValid = (data: UploadFormDescription) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      contents: data.contents,
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.contents !== '') {
      setValue('contents', fundingForm?.contents);
    }
  }, [fundingForm, setValue]);

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register('contents', {
            required: '입력된 텍스트가 없네요!',
            maxLength: {
              value: 100,
              message: '100자 까지 입력 가능해요',
            },
          })}
          name="contents"
          label="펀딩 콘텐츠"
          placeholder="펀딩 내용을 입력해주세요"
        />

        {errors?.contents?.type === 'required' && (
          <ErrorMessage>{errors.contents.message}</ErrorMessage>
        )}
        {errors?.contents?.type === 'maxLength' && (
          <ErrorMessage>{errors.contents.message}</ErrorMessage>
        )}
        <br />

        {watchContents != null && <NextButton type="submit">다음</NextButton>}
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
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  animation: ${smoothAppearDownUpLarge} 700ms;
`;
