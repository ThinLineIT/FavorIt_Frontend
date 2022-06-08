import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

const Date = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, done: true }));
  };
  return (
    <div onClick={handleClick}>
      <input type="date" />
    </div>
  );
};

export default Date;
