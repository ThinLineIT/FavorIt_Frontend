import { NextRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useCallback, useState } from 'react';

import { addPayments } from '@apis/fundApi';
import { deleteComma, numericOnlyWithComma } from '@util/helper/formatter';

export type addPresentTypes = {
  amount: number;
};

const useAddPresent = (router: NextRouter, fundId?: string | string[]) => {
  const [price, SetPrice] = useState('');
  const [inputSuccess, setInputSuccess] = useState(false);

  const queryFn = (data: addPresentTypes) => addPayments(data, fundId);
  const { mutate, isLoading, isSuccess } = useMutation(queryFn);

  const handleSubmit = useCallback(() => {
    mutate({ amount: Number(deleteComma(price)) });
  }, [mutate, price]);

  const handleKeyClick = useCallback((event: any) => {
    const name = event?.target?.innerHTML;
    if (name !== '&lt;-') {
      SetPrice((prev) => numericOnlyWithComma(prev + name));
    } else {
      SetPrice('');
    }
  }, []);

  const handleUpdateForm = () => {
    setInputSuccess(false);
  };

  const handleInputSuccess = () => {
    if (!price) return;
    setInputSuccess(true);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return {
    price,
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
