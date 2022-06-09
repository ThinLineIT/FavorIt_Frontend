import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';
import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';

const Title = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <Base onClick={handleClick}>
      <Input type="text" placeholder="펀딩의 이름을 지어주세요" />
    </Base>
  );
};

export default Title;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
`;
