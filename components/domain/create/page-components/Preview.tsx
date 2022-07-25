import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import GenerateFallback from '../fallback';
import useMutation from '@hooks/useMutation';
import { isMainFullHeight } from '@recoil/layout';
import GiftImage from '@public/assets/images/gift.svg';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import { isFundingForm, isLocalGenerator } from '@recoil/create';
import { formGeneratorType } from '@apis/@types/fund';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import FundingProgress from '@components/domain/detail/FundingProgress';
import dayjs from 'dayjs';

type fundingId = {
  funding_id: string;
};
interface MutationResult {
  data: fundingId;
  message: string;
}

const Preview = () => {
  const [didSubmit, setDidSubmit] = useState(false);
  const fundingForm = useRecoilValue(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const setIsFullHeight = useSetRecoilState(isMainFullHeight);

  const [create, { loading, data }] = useMutation<MutationResult>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/funding`,
  );
  const onMutate = () => create(fundingForm);

  useEffect(() => {
    if (loading) setIsFullHeight(true);
  }, [loading, setIsFullHeight]);

  useEffect(() => {
    if (data?.data?.funding_id) {
      setDidSubmit(true);
      setGenerator((prev: formGeneratorType) => ({
        ...prev,
        done: true,
        proceed: false,
        funding_id: data?.data?.funding_id,
      }));
    }
  }, [data, setGenerator]);

  console.log(fundingForm);

  const PreviewContent = (
    <Base aria-label="펀딩 정보 프리뷰">
      <Section>
        <Header aria-label="펀딩 이미지">
          <Image src={GiftImage} width={96} height={92} alt="funding image" />
        </Header>
        <Main>
          <Title>{fundingForm.name}</Title>
          <Link href={fundingForm.product.link} target="_blank">
            상품 보러 가기
          </Link>
          <Description>{fundingForm.contents}</Description>
          <CustomFundingProgress
            percent={0}
            dueDate={fundingForm.due_date}
            price={fundingForm.product.price}
            creationDate={dayjs(new Date()).toString()}
          />
        </Main>
        <Footer>
          <BackButton
            onClick={() =>
              setGenerator((prev: formGeneratorType) => ({
                ...prev,
                page: prev.page - 1,
              }))
            }
          >
            <span>&#60;-</span>
            <p>내용 수정</p>
          </BackButton>
          <NextButton onClick={onMutate}>
            <p>펀딩 시작</p>
            <span>-&#62;</span>
          </NextButton>
        </Footer>
      </Section>
    </Base>
  );

  return (
    <>
      {loading && !didSubmit && <GenerateFallback />}
      {!loading && didSubmit && null}
      {!loading && !didSubmit && PreviewContent}
    </>
  );
};

export default React.memo(Preview);

const Base = styled.div`
  width: 100%;
  height: 100%;
  ${columnFlexbox('start', 'center')};
  animation: ${smoothAppearDownUp} 300ms;
`;
const Section = styled.section`
  width: 100%;
`;
const Header = styled.header`
  ${flexbox()}
`;
const Main = styled.main`
  height: 100%;
  ${columnFlexbox('evenly', 'center')}
`;
const Title = styled.div`
  ${textStyle(24)}
`;
const Link = styled.a`
  ${textStyle(18, '#ffba50')}
  font-weight: 700;
  transition: opacity 200ms ease-in-out;
  &:hover {
    opacity: 0.4;
  }
  &:active {
    opacity: 0.4;
  }
`;
const Description = styled.div`
  ${textStyle(14)}
  text-align: justify;
  padding: 0 1.5rem;
  word-wrap: break-word;
`;
const Card = styled.div`
  width: 310px;
  ${columnFlexbox()}
  background: #ffffff;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;
const CustomFundingProgress = styled(FundingProgress)``;

const Footer = styled.footer`
  width: 100%;
  ${flexbox()}
  column-gap: 1rem;
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 9px rgba(231, 231, 231, 0.25),
    inset 0px -2px 9px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  ${flexbox()}
  ${textStyle(14, '#ffb84e')}
    font-weight: 700;
`;
const BackButton = styled(Button)`
  span {
    margin-right: 10px;
  }
`;
const NextButton = styled(Button)`
  span {
    margin-left: 10px;
  }
`;
