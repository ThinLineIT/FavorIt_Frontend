import React from 'react';
import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import { clientAuthApi as ax } from 'apis/auth';

import { useRouter } from 'next/router';

import OpendDetailPage from '@components/domain/detail/opened';
import ClosedDetailPage from '@components/domain/detail/closed';

export interface FundDetailModel {
  data: {
    name: string;
    contents: string;
    state: string;
    is_maker: boolean;
    image: string;
    creation_date: string;
    due_date: string;
    progress_percent: number;
    link_for_sharing: string;
    product: {
      link: string;
      price: number;
    };
  };
  message: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const api = async (): Promise<FundDetailModel> => {
    const res = await ax.get(`/api/funding/${router.query.id}`);
    return res.data;
  };

  const { data } = useQuery<FundDetailModel>(['get-detail'], api);

  const FormatPage = (status?: string) => {
    switch (status) {
      case 'OPENED':
        return <OpendDetailPage data={data} />;
      case 'COMPLETED':
        return <OpendDetailPage data={data} />;
      case 'CLOSED':
        return <ClosedDetailPage data={data} />;
      case 'EXPIRED':
        return <ClosedDetailPage data={data} />;
    }
  };

  return <>{data && FormatPage(data?.data?.state)}</>;
};

export default Home;
