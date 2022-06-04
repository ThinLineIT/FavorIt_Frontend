import styled from '@emotion/styled';
import { columnFlexbox } from 'styles/mixins/_flexbox';

export default function Custom404() {
  return (
    <PageContainer>
      <h1>{'(>_<)'}</h1>
      <br />
      <p>{"The page you're looking for doesn't exist. Sorry."}</p>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  ${columnFlexbox()};
  flex: 1;
  margin: 0 10px;
`;
