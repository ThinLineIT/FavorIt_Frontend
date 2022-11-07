/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { DefaultListModel } from 'pages/fund/list';
import FundItem from './FundItem';

import TapeGreen from './assets/tape_green.svg';
import TapePink from './assets/tape_pink.svg';
import Link from 'next/link';

export type FundListProps = {
  title: string;
  type: 'MY' | 'FRIENDS';
  data?: DefaultListModel[];
};

function FundList({ title, type, data }: FundListProps) {
  //   const Tapes = type === 'MY' ? TapeGreen : TapePink;

  console.log(data);

  return (
    <RootStyle>
      <Title>
        {/* <Tapes /> */}
        <h3>{title}</h3>
      </Title>
      <ListStyle>
        {data?.map((item, index) => (
          <li key={index}>
            <Link href={`/fund/${item.funding_id}`}>
              <a>
                <FundItem data={item} rotate={index % 2 === 0} />
              </a>
            </Link>
          </li>
        ))}
      </ListStyle>
    </RootStyle>
  );
}

export default FundList;

const RootStyle = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div``;

const ListStyle = styled.ul`
  width: 100%;
  height: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  column-gap: 70px;
  overflow-x: auto;
  overflow-y: hidden;
`;
