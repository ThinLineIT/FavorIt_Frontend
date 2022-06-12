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
import { useEffect } from 'react';

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
    <Base>
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
    </Base>
  );
};

export default Option;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 100px;
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
