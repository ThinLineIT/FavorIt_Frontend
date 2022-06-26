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
  option: string;
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
  const watchOptions = watch('option');
  const onValid = (data: UploadFormOption) => {
    setFundingForm((prev: FormType) => ({
      ...prev,
      product: { ...prev.product, option: data.option },
    }));
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
  };

  useEffect(() => {
    if (fundingForm?.product?.option !== '') {
      setValue('option', fundingForm?.product?.option);
    }
  }, [fundingForm, setValue]);

  return (
    <Form
      onSubmit={handleSubmit(onValid)}
      role="tabpanel"
      id="pagination-tab-1"
      aria-label="상품 옵션 입력"
    >
      <TextArea
        register={register('option', {
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

      {errors?.option?.type === 'required' && (
        <ErrorMessage>{errors.option.message}</ErrorMessage>
      )}
      {errors?.option?.type === 'maxLength' && (
        <ErrorMessage>{errors.option.message}</ErrorMessage>
      )}
      <br />

      {watchOptions != null && <NextButton type="submit">다음</NextButton>}
    </Form>
  );
};

export default Option;
