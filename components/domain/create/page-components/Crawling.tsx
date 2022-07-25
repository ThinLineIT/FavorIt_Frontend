import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { Input, ErrorMessage } from '@components/base';
import { isFundingForm, isLocalGenerator } from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { addFundFormType, formGeneratorType } from '@apis/@types/fund';
import { btn48, btnPrimary } from '@styles/modules/_buttons';

interface UploadFormLink {
  link: string;
}

const Crawling = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormLink>();
  const onValid = (data: UploadFormLink) => {
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: prev.page + 1,
    }));
    setFundingForm((prev: addFundFormType) => ({
      ...prev,
      product: { ...prev.product, link: data.link.trim() },
    }));
  };

  useEffect(() => {
    if (fundingForm?.product?.link !== '') {
      setValue('link', fundingForm?.product?.link);
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      aria-labelledby="pagination-tab-0"
      aria-label="상품 링크 입력"
    >
      <Input
        name="link"
        label="상품 링크"
        placeholder="상품 링크를 입력해주세요"
        register={register('link', {
          required: '입력된 텍스트가 없네요!',
          pattern: {
            value:
              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            message: '올바른 주소를 입력해 주세요',
          },
        })}
      />

      {errors?.link?.type === 'required' && (
        <ErrorMessage>{errors.link.message}</ErrorMessage>
      )}
      {errors?.link?.type === 'pattern' && (
        <ErrorMessage>{errors.link.message}</ErrorMessage>
      )}

      <NextButton type="submit" aria-label="다음 버튼">
        다음
      </NextButton>
    </Form>
  );
};

export default React.memo(Crawling);

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;
const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  margin-top: 25px;
`;
