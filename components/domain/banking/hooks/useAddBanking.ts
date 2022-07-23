import { useState, useCallback } from 'react';
import { useMutation } from 'react-query';

import { getCheckBanksApi } from '@apis/fundApi';

const useAddBanking = ({ router, code }: any) => {
  const [banks, SetBanks] = useState<string>('');
  const [inputSuccess, setInputSuccess] = useState(false);

  const getBanksFn = (data: any) => getCheckBanksApi(data);
  const {
    mutate: getBanksMutate,
    isLoading,
    isSuccess,
  } = useMutation(getBanksFn, {
    onSuccess: (data: any) => SetBanks(data.data),
  });

  const handleSubmit = useCallback(() => {
    getBanksMutate({ code, account_number: banks });
  }, [banks, code, getBanksMutate]);

  const handleKeyClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (event.target instanceof HTMLSpanElement) {
        const keyName = event?.target?.innerHTML;

        if (keyName !== '&lt;-') {
          SetBanks((prev) => prev + keyName);
        } else {
          SetBanks((prev) => {
            const editedPrice = prev.slice(0, -1);
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
    if (!banks) return;
    setInputSuccess(true);
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return {
    banks,
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

export default useAddBanking;
