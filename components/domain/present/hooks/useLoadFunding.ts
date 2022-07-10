import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { detailFundApi } from '@apis/fundApi';
import { FundDetailTypes } from '@apis/types';

const useLoadFunding = (fundId?: string | string[]) => {
  const queryFn = () => detailFundApi(fundId);
  const { isLoading, error, data } = useQuery<
    AxiosResponse<FundDetailTypes>,
    AxiosError
  >([`funding-${fundId}`, fundId], queryFn);

  return {
    isLoading,
    error,
    data: data?.data?.data,
  };
};

export default useLoadFunding;
