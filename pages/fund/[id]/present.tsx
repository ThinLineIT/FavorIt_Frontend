import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { columnFlexbox } from '@styles/mixins/_flexbox';
import AddPresentForm from '@components/domain/present/AddPresentForm';
import useLoadFunding from '@components/domain/present/hooks/useLoadFunding';
import GenerateFallback from '@components/domain/create/fallback';

const Present = () => {
  const router = useRouter();
  const { id: fundId } = router?.query;
  const { data, isLoading } = useLoadFunding(fundId);

  // @TODO: Suspense 적용하기
  if (isLoading) return <GenerateFallback />;

  return (
    <Root>
      <PresentHeader>
        <b>{data?.name}</b>에 선물하기
      </PresentHeader>
      <AddPresentForm fundId={fundId} router={router} />
    </Root>
  );
};

export default Present;

const Root = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  position: relative;
  ${columnFlexbox('start', 'start')};
`;
const PresentHeader = styled.header`
  margin-left: 33px;
  margin-right: 44px;
  height: 100px;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;

  & > b {
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    display: block;
  }
`;
