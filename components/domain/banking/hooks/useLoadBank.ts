import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import { getBanksApi } from '@apis/fundApi';
import { BankList } from '../BankCardList';

const useLoadBanks = () => {
  const [banks, SetBanks] = useState<BankList>();

  const getBanksFn = () => getBanksApi();
  const {
    mutate: getBanksMutate,
    isLoading,
    isSuccess,
  } = useMutation(getBanksFn, {
    onSuccess: (data: any) => SetBanks(data.data),
  });

  useEffect(() => getBanksMutate(), [getBanksMutate]);

  return {
    getBanksMutate,
    banks,
    isLoading,
    isSuccess,
  };
};

export default useLoadBanks;
