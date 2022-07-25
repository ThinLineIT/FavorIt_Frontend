import { numericOnlyWithComma } from '@util/helper/formatter';
import { useCallback, useState } from 'react';

const useKeypads = (isPrice?: boolean) => {
  const [value, setValue] = useState('');

  const handleKeyClick = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (event.target instanceof HTMLSpanElement) {
        const keyName = event?.target?.innerHTML;

        if (keyName !== '&lt;-') {
          setValue((prev) =>
            isPrice ? numericOnlyWithComma(prev + keyName) : prev + keyName,
          );
        } else {
          setValue((prev) => {
            const editedPrice = prev.slice(0, -1);
            return editedPrice;
          });
        }
      }
    },
    [],
  );

  return {
    value,
    setValue,
    handleKeyClick,
  };
};

export default useKeypads;
