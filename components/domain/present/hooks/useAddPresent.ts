import { NextRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useCallback, useState } from 'react';

import { addPayments } from '@apis/fundApi';
import { addPresentTypes } from '@apis/types';
import { deleteComma, numericOnlyWithComma } from '@util/helper/formatter';

const useAddPresent = (router: NextRouter, fundId?: string | string[]) => {
  const [price, SetPrice] = useState('');
  const [inputSuccess, setInputSuccess] = useState(false);

  const queryFn = (data: addPresentTypes) => addPayments(data, fundId);
  const { mutate, isLoading, isSuccess } = useMutation(queryFn);

  const handleSubmit = useCallback(() => {
    mutate({ amount: Number(deleteComma(price)) });
  }, [mutate, price]);

  const handleKeyClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (event.target instanceof HTMLSpanElement) {
        const keyName = event?.target?.innerHTML;

        if (keyName !== '&lt;-') {
          SetPrice((prev) => numericOnlyWithComma(prev + keyName));
        } else {
          SetPrice((prev) => {
            const editedPrice = deleteComma(prev).slice(0, -1);
            return editedPrice;
          });
        }
      }
    },
    [],
  );

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
