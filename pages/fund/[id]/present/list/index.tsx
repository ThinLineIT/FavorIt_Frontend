import type { NextPage } from 'next';
import styled from '@emotion/styled';

const Present: NextPage = () => {
  return (
    <PresentPage>
      <ListWrapper>
        <LeftPage></LeftPage>
        <RightPage></RightPage>
      </ListWrapper>
    </PresentPage>
  );
};

const PresentPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 200%;
  background-color: #f9ede5;
  padding: 0 17px;
`;

const ListWrapper = styled.section`
  display: flex;
  height: 77%;
  width: 95%;
`;

const LeftPage = styled.div`
  width: 50%;

  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-image: url('/assets/images/PresentLeftPage.png');
`;

const RightPage = styled.div`
  width: 50%;

  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-image: url('/assets/images/PresentRightPage.png');
`;

export default Present;
