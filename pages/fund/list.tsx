import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { clientAuthApi as ax } from 'apis/auth';

import FundListComponent from 'components/domain/fundList/FundList';

export interface DefaultListModel {
  funding_id: number;
  name: string;
  due_date: string;
  image: string;
}

export interface FundListModel {
  data: {
    my_fundings: DefaultListModel[];
    friends_fundings: DefaultListModel[];
  };
}

function FundList() {
  const api = async (): Promise<FundListModel> => {
    const res = await ax.get('/api/fundings');
    return res.data;
  };

  const { data } = useQuery<FundListModel>(['get-lists'], api);

  return (
    <RootStlye>
      <FundListComponent
        title="내가 만든 펀딩(*/ω＼*)"
        type="MY"
        data={data?.data.my_fundings.reverse()}
      />
      <FundListComponent
        title="친구들의 펀딩 (●'e'●)"
        type="FRIENDS"
        data={data?.data.friends_fundings}
      />
    </RootStlye>
  );
}

export default FundList;

const RootStlye = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9ede5;
  display: flex;
  flex-direction: column;
`;
