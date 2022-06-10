import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import TextArea from '@components/base/TextArea';
import { flexbox } from '@styles/mixins/_flexbox';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { generatorType, isLocalGenerator } from '@recoil/create';

interface UploadFormOption {
  item_option: string;
}

const Option = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormOption>();

  const onValid = (data: UploadFormOption) =>
    setGenerator((prev: generatorType) => ({ ...prev, page: prev.page + 1 }));

  return (
    <Base>
      <Form onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register('item_option', {
            required: '올바른 옵션을 입력해주세요',
            maxLength: {
              value: 60,
              message: '60자 까지 입력 가능해요',
            },
          })}
          required
          label="Option"
          labelHidden
          name="link"
          placeholder="상품 옵션을 입력해주세요!"
        />
        <div style={{ width: '100px', height: '100px', color: 'red' }}>
          {errors?.item_option?.type === 'maxLength' &&
            errors.item_option.message}
        </div>
        <button>reply</button>
      </Form>
    </Base>
  );
};

export default Option;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Form = styled.form`
  width: 100%;
  animation: ${smoothAppearDownUp} 700ms;
`;
