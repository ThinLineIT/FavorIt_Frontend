import { detailApi } from '@apis/fundApi';
import { DeferredComponent } from '@components/base';
import Skeleton from '@components/base/Skeleton';
import GenerateFallback from '@components/domain/create/fallback';
import { GoBack } from '@components/layout';
import styled from '@emotion/styled';
import { FormType } from '@recoil/create';
import { columnFlexbox } from '@styles/mixins/_flexbox';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import { AxiosError, AxiosResponse } from 'axios';
import { Suspense, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Base = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const MainBase = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 80px;
  ${columnFlexbox('start', 'start')};
  animation: ${smoothAppearDownUp} 700ms;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 10px;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
  box-sizing: border-box;
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 30%;
  box-sizing: border-box;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`;
const Info = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;
const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;
const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
  word-break: break-all;
`;

const Placeholder: React.FC = () => (
  // <Item /> 에 대응하는 Placeholder 제작
  <Container>
    <ImageWrapper>
      <Skeleton width={100} height={100} unit="%" />
    </ImageWrapper>
    <Info>
      <Skeleton width={270} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={300} height={19} rounded />
      <div style={{ height: '30px' }} />
      <Skeleton width={200} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={300} height={19} rounded />
      <div style={{ height: '30px' }} />
      <Skeleton width={150} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={200} height={19} rounded />
      <div style={{ height: '30px' }} />
      <Skeleton width={150} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={200} height={19} rounded />
      <div style={{ height: '30px' }} />
      <Skeleton width={210} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={270} height={19} rounded />
      <div style={{ height: '30px' }} />
    </Info>
  </Container>
);

const Item: React.FC = () => {
  return (
    <MainBase>
      <Info>
        <Title>펀딩을 생성했습니다!</Title>
        <Description>친구들에게 공유해보세요</Description>
      </Info>
    </MainBase>
  );
};

function FundList({}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 임의로 로딩 상태 표현
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? null : <GoBack path="/" />}
      <Base>
        {loading
          ? Array.from({ length: 1 }).map((_, idx) => (
              <DeferredComponent key={idx}>
                <Placeholder />
              </DeferredComponent>
            ))
          : Array.from({ length: 1 }).map((_, idx) => <Item key={idx} />)}
      </Base>
    </>
  );
}

export default FundList;
