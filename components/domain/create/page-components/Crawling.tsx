import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import { flexbox } from '@styles/mixins/_flexbox';
import { textStyle } from '@styles/mixins/_text-style';
import { Input, ErrorMessage } from '@components/base';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';

interface UploadFormLink {
  link: string;
}

const Crawling = () => {
  const setFundingForm = useSetRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormLink>({
    mode: 'onBlur',
  });
  const onValid = (data: UploadFormLink) => {
    setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
    setFundingForm((prev: FormType) => ({
      ...prev,
      product: { ...prev.product, link: data.link },
    }));
  };

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          name="link"
          label="상품 링크"
          placeholder="상품 링크를 입력해주세요"
          register={register('link', {
            required: '올바른 주소를 입력해 주세요',
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
              message: '올바른 주소를 입력해 주세요',
            },
          })}
        />

        {errors?.link?.type === 'pattern' && (
          <ErrorMessage>{errors.link.message}</ErrorMessage>
        )}

        <NextButton type="submit" aria-label="추가 옵션 버튼">
          추가 옵션
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </NextButton>
      </Form>
    </Base>
  );
};

export default Crawling;

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
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  text-align: left;
  padding: 0 1px;
  margin-top: 1rem;
  ${textStyle(16, '#4E5969')};

  > svg {
    transform: rotate(180deg);
    width: 1.25rem;
    height: 1.25rem;
    color: #737481;
  }
`;
