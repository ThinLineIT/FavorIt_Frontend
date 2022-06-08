import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

const Option = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div onClick={handleClick}>
      <textarea placeholder="상품 옵션을 입력해주세요" />
    </div>
  );
};

export default Option;
