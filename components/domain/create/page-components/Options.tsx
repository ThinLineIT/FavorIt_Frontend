import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { TextArea, ErrorMessage } from '@components/base';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
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

interface UploadFormOption {
  options: string;
}

const Option = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormOption>();
  const watchOptions = watch('options');
  const onValid = (data: UploadFormOption) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      product: { ...prev.product, options: data.options },
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.product?.options !== '') {
      setValue('options', fundingForm?.product?.options);
    }
  }, [fundingForm, setValue]);

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <TextArea
        register={register('options', {
          required: '입력된 텍스트가 없네요!',
          maxLength: {
            value: 60,
            message: '60자 까지 입력 가능해요',
          },
        })}
        name="option"
        label="상품 옵션"
        placeholder="상품 옵션을 입력해주세요"
      />

      {errors?.options?.type === 'required' && (
        <ErrorMessage>{errors.options.message}</ErrorMessage>
      )}
      {errors?.options?.type === 'maxLength' && (
        <ErrorMessage>{errors.options.message}</ErrorMessage>
      )}
      <br />

      {watchOptions != null && <NextButton type="submit">다음</NextButton>}
    </Form>
  );
};

export default Option;
