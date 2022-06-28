import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { GoBack } from '@components/layout';
import { isMainFullHeight } from '@recoil/layout';
import { DeferredComponent } from '@components/base';
import { textStyle } from '@styles/mixins/_text-style';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import GenerateFallback from '@components/domain/create/fallback';
import { useRouter } from 'next/router';

const MainBase = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  padding: 0 20px;
  margin-top: 50px;
  animation: ${smoothAppearDownUp} 700ms;
`;
const Icon = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d3d3d33a;
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

const Item: React.FC = () => {
  const router = useRouter();
  const copyTextUrl = () => {
    const { href } = window.location;
    navigator.clipboard.writeText(href).then(() => {
      alert('링크를 복사했습니다.');
    });
  };

  return (
    <MainBase>
      <Icon />
      <Title>
        펀딩이 시작되었습니다. <br /> 링크를 공유하여 펀딩을 받으세요!
      </Title>
      <ButtonGroup>
        <LinkButton onClick={copyTextUrl}>링크 복사</LinkButton>
        <DetailButton onClick={() => router.push('/fund/detail')}>
          펀딩 보기
        </DetailButton>
      </ButtonGroup>
    </MainBase>
  );
};

function FundList({}) {
  const [loading, setLoading] = useState<boolean>(true);
  const setIsFullHeight = useSetRecoilState(isMainFullHeight);

  useEffect(() => {
    // 임의로 로딩 상태 표현
    setIsFullHeight(true);
    setTimeout(() => setLoading(false), 2800);
  }, [setIsFullHeight]);

  return (
    <>
      {loading ? (
        Array.from({ length: 1 }).map((_, idx) => (
          <DeferredComponent key={idx}>
            <GenerateFallback />
          </DeferredComponent>
        ))
      ) : (
        <Item />
      )}
      {loading ? null : <GoBack path="/" />}
    </>
  );
}

export default FundList;
