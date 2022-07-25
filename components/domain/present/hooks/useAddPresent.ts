import { NextRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useCallback, useState } from 'react';

import { addPaymentsApi } from '@apis/fundApi';
import { addPaymentTypes } from '@apis/@types/fund';
import { deleteComma } from '@util/helper/formatter';
import useKeypads from '@hooks/useKeypads';

const useAddPresent = (router: NextRouter, fundId: number) => {
  const { value, handleKeyClick } = useKeypads(true);
  const [inputSuccess, setInputSuccess] = useState(false);

  const queryFn = (data: addPaymentTypes) => addPaymentsApi(data, fundId);
  const { mutate, isLoading, isSuccess } = useMutation(queryFn);

  const handleSubmit = useCallback(() => {
    mutate({ amount: Number(deleteComma(value)) });
  }, [mutate, value]);

  const handleUpdateForm = () => {
    setInputSuccess(false);
  };

  const handleInputSuccess = () => {
    if (!value) return;
    setInputSuccess(true);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return {
    value,
    isLoading,
    inputSuccess,
    isSuccess,
    handleSubmit,
    handleKeyClick,
    handleGoBack,
    handleUpdateForm,
    handleInputSuccess,
  };
};

export default useAddPresent;
