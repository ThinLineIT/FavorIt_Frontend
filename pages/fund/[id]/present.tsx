import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { columnFlexbox } from '@styles/mixins/_flexbox';
import GenerateFallback from '@components/domain/create/fallback';
import AddPresentForm from '@components/domain/present/AddPresentForm';
import useLoadFunding from '@components/domain/present/hooks/useLoadFunding';

interface PresentProps {
  fundId: number;
}

const Present = ({ fundId }: PresentProps) => {
  const router = useRouter();
  const { data, isLoading } = useLoadFunding(fundId);

  if (isLoading) return <GenerateFallback />;

  return (
    <Root>
      <PresentHeader>
        <Title>{data?.name}</Title>에 선물하기
      </PresentHeader>
      <AddPresentForm fundId={fundId} fundName={data?.name} router={router} />
    </Root>
  );
};

export default Present;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fundId = params?.id;
  return {
    props: {
      fundId: +String(fundId),
    },
  };
};

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
`;

const Title = styled.h2`
  display: block;
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
`;
