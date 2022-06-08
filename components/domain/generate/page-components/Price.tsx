import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

const Price = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <div onClick={handleClick}>
      <input type="number" placeholder="펀딩 목표액을 입력해주세요" />
    </div>
  );
};

export default Price;
