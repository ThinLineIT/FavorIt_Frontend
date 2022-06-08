import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';

const Title = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <div onClick={handleClick}>
      <input type="text" placeholder="펀딩의 이름을 지어주세요" />
    </div>
  );
};

export default Title;
