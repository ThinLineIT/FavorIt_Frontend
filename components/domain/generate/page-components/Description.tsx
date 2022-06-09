import React from 'react';
import { useSetRecoilState } from 'recoil';
import { isLocalGenerator } from '@recoil/generate';
import { flexbox } from '@styles/mixins/_flexbox';
import styled from '@emotion/styled';

const Description = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, page: prev.page + 1 }));
  };
  return (
    <Base onClick={handleClick}>
      <Input placeholder="펀딩 내용을 담아주세요!" />
    </Base>
  );
};

export default Description;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Input = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
`;
