import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import { getBanksApi } from '@apis/fundApi';

const useLoadBanks = () => {
  const [banks, SetBanks] = useState([]);
  const [bankCode, setBankCode] = useState('');
  const [isSetBank, setIsSetBank] = useState(false);

  const getBanksFn = () => getBanksApi();
  const { mutate, isLoading } = useMutation(getBanksFn, {
    onSuccess: (data: any) => {
      SetBanks(data.data);
    },
  });

  const handleSetBank = () => {
    setIsSetBank((prev) => !prev);
  };

  const handleSetValue = (val: string) => {
    setBankCode(val);
  };

  useEffect(() => mutate(), [mutate]);

  return {
    banks,
    bankCode,
    isSetBank,
    isLoading,
    handleSetBank,
    handleSetValue,
  };
};

export default useLoadBanks;
