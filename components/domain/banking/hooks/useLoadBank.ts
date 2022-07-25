import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import { getBanksApi } from '@apis/fundApi';

const useLoadBanks = () => {
  const [banks, SetBanks] = useState([]);
  const [bankCode, setBankCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [isSetBank, setIsSetBank] = useState(false);

  const getBanksFn = () => getBanksApi();
  const { mutate, isLoading } = useMutation(getBanksFn, {
    onSuccess: (data: any) => {
      SetBanks(data.data);
    },
  });

  const handleSetBank = () => {
    setIsSetBank((prev) => !prev);
    setBankName('');
  };

  const handleSetValue = (val: string) => {
    setBankCode(val);
  };

  const handleSetBankName = (name: string) => {
    setBankName(name);
  };

  useEffect(() => mutate(), [mutate]);

  return {
    banks,
    bankName,
    bankCode,
    isSetBank,
    isLoading,
    handleSetBank,
    handleSetValue,
    handleSetBankName,
  };
};

export default useLoadBanks;
