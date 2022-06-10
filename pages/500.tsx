import styled from '@emotion/styled';

import { GoBack } from '@components/layout';
import { columnFlexbox } from 'styles/mixins/_flexbox';

export default function Custom500() {
  return (
    <>
      <GoBack path="/" />
      <PageContainer>
        <h1>(o_o)/</h1>
        <br />
        <p>{"The page you're looking for doesn't exist. Sorry."}</p>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  ${columnFlexbox()};
  flex: 1;
  margin: 0 10px;
`;
