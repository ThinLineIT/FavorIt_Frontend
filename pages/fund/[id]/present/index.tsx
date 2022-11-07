import Image from 'next/image';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState, useEffect, MouseEvent } from 'react';
import type { PresentType, PresentApiType } from '@apis/@types/present';
import ArrowRight from '@public/assets/images/ArrowRight.svg';
import PresentTo from '@public/assets/images/PresentTo.png';
import PresentFrom from '@public/assets/images/PresentFrom.png';
import PresentPrice from '@public/assets/images/PresentPrice.png';
import Keypad from '@components/base/Keypad';
import { useForm } from 'react-hook-form';
import PresentDetailIamge from '@components/domain/present/PresentDetailImage';
import { presentApi } from '@apis/present';

const PresentForm = () => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<PresentApiType>();
  const [keypad, setKeypad] = useState(false);
  const [imageSrc, setImageSrc] = useState<Blob | null>(null);
  const router = useRouter();
  const onSubmit = (reqData: PresentApiType) => {
    console.log(reqData);
    const data = new FormData();

    for (const [key, value] of Object.entries(reqData)) {
      const valueData = `${value}` as string;
      if (key === 'image') {
        const test = value as Blob;
        data.append(key, test, 'present-image');
      } else {
        data.append(key, valueData);
      }
    }

    const fundId = Number(router.asPath.split('/')[2]);
    try {
      presentApi(fundId, data);
      router.push(`/fund/${fundId}/present-complete`);
    } catch (error) {
      console.log(error);
      router.push(`/404`);
    }
  };

  const handleKeyClick = (event: MouseEvent<HTMLSpanElement>) => {
    const amount = getValues('amount');
    const choiAmount = Number(amount + event.currentTarget.innerText);
    setValue('amount', choiAmount);
  };

  useEffect(() => {
    if (imageSrc) {
      setValue('image', imageSrc);
    }
  }, [imageSrc]);
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={keypad ? 'move-up' : ''}
      >
        <PresentItemCard>
          <BackToList onClick={() => router.back()}>
            <Image src={ArrowRight} width={32} height={32} />
          </BackToList>
          <PresentDetailIamge imageSrc={imageSrc} setImageSrc={setImageSrc} />
          <LetterWrapper>
            <NameWrapper>
              <Image src={PresentTo} width={36} />
              <input
                {...register('to_name', {
                  required: true,
                  maxLength: 10,
                })}
                maxLength={10}
                type="text"
                placeholder="친구를 10자 이내로 표현해주세요."
              />
            </NameWrapper>
            <PresentContents
              {...register('contents')}
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
            ></PresentContents>
            <LetterBottom>
              <NameWrapper style={{ marginBottom: '11px' }}>
                <Image src={PresentFrom} width={'50%'} />
                <div style={{ width: '50%' }}>
                  <input
                    {...register('from_name')}
                    type="text"
                    placeholder="친구에게 보여질 이름이에요"
                  />
                </div>
              </NameWrapper>
              <NameWrapper>
                <Image src={PresentPrice} width={'50%'} />{' '}
                <div
                  style={{ width: '50%' }}
                  onClick={() => setKeypad(!keypad)}
                >
                  <input
                    type="number"
                    {...register('amount')}
                    placeholder="얼마를 선물할까요?"
                  />
                </div>
              </NameWrapper>
            </LetterBottom>
          </LetterWrapper>
        </PresentItemCard>
        <PresentButton type="submit">선물하기</PresentButton>
      </Form>
      {keypad && (
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <Keypad onClick={handleKeyClick} />
        </div>
      )}
    </>
  );
};

const Form = styled.form`
  height: 100%;
  &.move-up {
    transform: translateY(-320px);
  }
`;

const PresentItemCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 85%;
  margin: 52px auto 0 auto;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;

const BackToList = styled.div`
  display: flex;
  align-items: center;
  color: #686868;
  font-size: 16px;
  font-weight: 400;
  padding: 17px 0 18px 17px;
  line-height: 20.57px;
`;

const LetterWrapper = styled.div`
  font-weight: 400;
  font-size: 16px;
  width: 100%;
  padding: 25px 32px 28px 32px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  & div > input {
    margin-left: 19px;
    &::placeholder {
      color: #969696;
      font-size: 11px;
    }
  }
`;

const PresentContents = styled.textarea`
  resize: none;
  height: 100px;
  max-height: 100px;
  &::placeholder {
    color: #969696;
    font-size: 11px;
  }
`;

const LetterBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20%;
`;

const PresentButton = styled.button`
  width: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  aspect-ratio: 20 / 3;
  margin-top: 23px;
`;

export default PresentForm;
