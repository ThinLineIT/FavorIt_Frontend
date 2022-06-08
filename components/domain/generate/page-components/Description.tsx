import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

const Description = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <div onClick={handleClick}>
      <textarea placeholder="펀딩 내용을 담아주세요!" />
    </div>
  );
};

export default Description;
