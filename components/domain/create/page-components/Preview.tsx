import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Button, Input, TextArea } from '@components/base';
import useMutation from '@apis/useMutation';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface fundingId {
  funding_id: string;
}
interface MutationResult {
  data: fundingId;
  message: string;
}

const Preview = () => {
  const router = useRouter();
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const [create, { loading, data, error }] = useMutation<MutationResult>(
    'https://3.35.218.213/api/funding',
  );
  const onMutate = () => {
    create(fundingForm);
    setGenerator((prev: GeneratorType) => ({
      ...prev,
      done: true,
      proceed: false,
    }));
  };

  // const {
  //   watch,
  //   register,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormType>({
  //   mode: 'onBlur',
  // });
  // const onValid = (data: FormType) => {
  //   setFundingForm(data);
  // };
  // useEffect(() => {
  //   if (fundingForm?.product) {
  //     setValue('product.link', fundingForm?.product?.link);
  //     setValue('product.options', fundingForm?.product?.options);
  //     setValue('product.price', fundingForm?.product?.price);
  //   }
  // }, [fundingForm, setValue]);

  useEffect(() => {
    if (data?.data?.funding_id) {
      setGenerator((prev: GeneratorType) => ({
        ...prev,
        done: true,
        proceed: false,
      }));
    }
  }, [data, setGenerator]);

  return (
    <Base>
      <Description>
        반가워요 유저님! <br />
        작성하신 내용을 확인해주세요
        <br />
        펀딩 생성을 진행할까요 ?
        <br />
        <br />
        요기에 미리 작성한 것들 보여줌
      </Description>
      {/* <Previews onSubmit={handleSubmit(onValid)}>
        <Input
          name="link"
          label="상품 링크"
          placeholder="상품 링크를 입력해주세요"
          register={register('product.link', {
            required: '입력된 텍스트가 없네요!',
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
              message: '올바른 주소를 입력해 주세요',
            },
          })}
        />
        <TextArea
          register={register('product.options', {
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
        <Input
          register={register('product.price', {
            required: '입력된 가격이 없네요!',
            pattern: {
              value: /^[0-9]+$/,
              message: '올바른 가격을 입력해 주세요',
            },
          })}
          name="price"
          kind="price"
          type="number"
          label="상품 가격"
          placeholder="0"
        />
      </Previews> */}
      <br />
      <br />
      <br />
      <Button onClick={onMutate}>좋아요</Button>
    </Base>
  );
};

export default Preview;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 100px;
  ${columnFlexbox('start', 'center')};

  animation: ${smoothAppearDownUp} 300ms;
`;

const Description = styled.div`
  width: 100%;
  ${textStyle(18, '#333C4A')}
`;

const Previews = styled.form`
  width: 100%;
  background-color: #fff;
  border-radius: 15px;
  padding: 8px;
  ${columnFlexbox()}
`;
