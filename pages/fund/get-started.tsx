import Image from 'next/image';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';

import { GoBack } from '@components/layout';
import siteMetadata from '@constants/sitemap';
import { textStyle } from '@styles/mixins/_text-style';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import CongImage from '@public/assets/images/congratulations.svg';
import { isLocalGenerator } from '@recoil/create';
import { useEffect } from 'react';

function FundList() {
  const router = useRouter();
  const { id } = router.query;
  const resetGenerator = useResetRecoilState(isLocalGenerator);

  useEffect(() => {
    resetGenerator();
  }, [resetGenerator]);

  const copyTextUrl = () => {
    const baseUrl = `${siteMetadata.siteUrl}fund/detail/${id}`;
    navigator.clipboard.writeText(baseUrl).then(() => {
      // 추후 토스트 메시지를 통해 유저에게 알리기
      alert('링크를 복사했습니다.');
    });
  };

  return (
    <MainBase>
      <Header aria-label="펀딩 이미지">
        <Image src={CongImage} width={158} height={112} alt="funding image" />
      </Header>
      <Title>
        펀딩이 시작되었습니다. <br /> 링크를 공유하여 펀딩을 받으세요!
      </Title>
      <ButtonGroup>
        <LinkButton onClick={copyTextUrl}>링크 복사</LinkButton>
        <DetailButton onClick={() => router.replace(`/fund/detail/${id}`)}>
          펀딩 보기
        </DetailButton>
      </ButtonGroup>
      <GoBack path="/" />
    </MainBase>
  );
}

export default FundList;

const MainBase = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  padding: 0 20px;
  margin-top: 50px;
  animation: ${smoothAppearDownUp} 700ms;
`;
const Header = styled.header`
  ${flexbox()}
`;
const Title = styled.h4`
  ${textStyle(18)}
  text-align: center;
  padding: 2rem 1rem;
`;
const ButtonGroup = styled.footer`
  width: 100%;
  ${columnFlexbox()}
  row-gap: .5rem;
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
const LinkButton = styled(Button)`
  span {
    margin-right: 10px;
  }
`;
const DetailButton = styled(Button)`
  span {
    margin-left: 10px;
  }
`;
