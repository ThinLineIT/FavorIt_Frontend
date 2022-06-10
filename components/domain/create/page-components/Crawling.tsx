import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { keyframes } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import Input from '@components/base/Input';
import { flexbox } from '@styles/mixins/_flexbox';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { generatorType, isLocalGenerator } from '@recoil/create';
import { errorAppear, smoothAppearDownUp } from '@styles/modules/_keyframes';

interface UploadFormLink {
  item_link: string;
}

const Crawling = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFormLink>();
  const onValid = (data: UploadFormLink) =>
    setGenerator((prev: generatorType) => ({ ...prev, page: prev.page + 1 }));
  const linkUrl = watch('item_link');

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          register={register('item_link', {
            required: '올바른 주소를 입력해 주세요',
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
              message: '올바른 주소를 입력해 주세요',
            },
          })}
          required
          label="Link"
          labelHidden
          name="link"
          type="text"
          kind="text"
          placeholder="상품 링크를 입력해주세요!"
        />
        <div style={{ width: '100px', height: '100px', color: 'red' }}>
          {errors?.item_link?.type === 'pattern' && errors.item_link.message}
        </div>
        {linkUrl && <NextButton>다음</NextButton>}
      </Form>
    </Base>
  );
};

export default Crawling;

export const smoothAppearDownUpHigh = keyframes`
from {
   opacity: 0;
   transform: translateY(25%);
 }
 to {
   opacity: 1;
   transform: translateY(0);
 }
`;

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
  animation: ${smoothAppearDownUp} 700ms;
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  position: absolute;
  bottom: 125px;
  width: 125px;
  animation: ${smoothAppearDownUpHigh} 1s;
`;

const Error = styled.span`
  display: block;
  color: red;
  height: 1.5rem;
  position: absolute;
  bottom: 150px;
  animation: ${errorAppear} 250ms;
`;
