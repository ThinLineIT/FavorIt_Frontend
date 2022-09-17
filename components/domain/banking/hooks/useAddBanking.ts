import { useState, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';

import { checkBankAccountApi, paymentFundApi } from '@apis/fundApi';
import { CheckBanksTypes, paymentsDoneData } from '@apis/@types/fund';
import useKeypads from '@hooks/useKeypads';
import { deleteComma } from '@util/helper/formatter';

const useAddBanking = ({ router, bank_code }: any) => {
  const { id } = router.query;
  const { value, handleKeyClick } = useKeypads();
  const [accountUser, setAccountUser] = useState('');
  const [inputSuccess, setInputSuccess] = useState(false);

  const getBanksFn = (data: CheckBanksTypes) => checkBankAccountApi(data);
  const { mutate, isLoading, isSuccess } = useMutation(getBanksFn, {
    onSuccess: (data) => setAccountUser(data.data.account_owner_name),
  });
  const paymentsDoneFn = (data: paymentsDoneData) => paymentFundApi(data, id);
  const { mutate: paymentsDoneMutate, isSuccess: bankingIsSuccess } =
    useMutation(paymentsDoneFn);

  const handleCheckAccount = useCallback(() => {
    if (!value) return;
    mutate({ bank_code, account_number: deleteComma(value) });
  }, [value, mutate, bank_code]);

  const handleUpdateForm = () => {
    setInputSuccess(false);
  };

  const handleSubmit = useCallback(() => {
    if (!value) return;
    paymentsDoneMutate({
      funding_id: +id,
      bank_code,
      full_name: accountUser,
      account_number: value,
    });
  }, [accountUser, bank_code, id, paymentsDoneMutate, value]);

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
    bankingIsSuccess,
    handleCheckAccount,
  };
};

export default useAddBanking;
