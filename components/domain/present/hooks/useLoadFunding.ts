import { useQuery, UseQueryOptions } from 'react-query';

import { detailFundApi } from '@apis/fundApi';
import { fundKeys } from '@apis/queryKeys/fund';
import { FundDetailsData } from '@apis/@types/fund';

const useLoadFunding = (
  fundId: number,
  options?: UseQueryOptions<FundDetailsData>,
) =>
  useQuery<FundDetailsData>(
    fundKeys.detail(fundId),
    () => detailFundApi(fundId),
    options,
  );

export default useLoadFunding;
