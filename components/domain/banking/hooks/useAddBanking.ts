import { useState, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';

import { checkBankAccountApi } from '@apis/fundApi';
import { CheckBanksTypes } from '@apis/@types/fund';
import useKeypads from '@hooks/useKeypads';
import { deleteComma } from '@util/helper/formatter';

const useAddBanking = ({ router, bank_code }: any) => {
  const { value, handleKeyClick } = useKeypads();
  const [accountUser, setAccountUser] = useState('');
  const [inputSuccess, setInputSuccess] = useState(false);

  const getBanksFn = (data: CheckBanksTypes) => checkBankAccountApi(data);
  const { mutate, isLoading, isSuccess } = useMutation(getBanksFn, {
    onSuccess: (data) => setAccountUser(data.data.account_owner_name),
  });

  const handleCheckAccount = useCallback(() => {
    if (!value) return;
    mutate({ bank_code, account_number: deleteComma(value) });
  }, [value, mutate, bank_code]);

  const handleUpdateForm = () => {
    setInputSuccess(false);
  };

  const handleSubmit = () => {
    if (!value) return;
    router.replace('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const labelString = !inputSuccess
    ? value !== ''
      ? value
      : '계좌번호를 입력해주세요'
    : `받으시는 분이 ${accountUser} 맞으실까요?`;

  useEffect(() => {
    if (isSuccess) {
      setInputSuccess(true);
    }
  }, [isSuccess]);

  return {
    value,
    isLoading,
    isSuccess,
    labelString,
    accountUser,
    inputSuccess,
    handleGoBack,
    handleSubmit,
    handleKeyClick,
    handleUpdateForm,
    handleCheckAccount,
  };
};

export default useAddBanking;
