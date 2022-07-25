import React from 'react';
import styled from '@emotion/styled';

import Skeleton from '@components/base/Skeleton';
import { DeferredComponent } from '@components/base';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 25px 15px;
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
const Info = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const GenerateFallback = () => {
  return (
    <DeferredComponent>
      <Container>
        <ImageWrapper>
          <Skeleton width={100} height={100} unit="%" rounded />
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
    </DeferredComponent>
  );
};

export default GenerateFallback;
