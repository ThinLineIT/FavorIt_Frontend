import React from 'react';
import styled from '@emotion/styled';

import { Button } from '@components/base';
import { useSetRecoilState } from 'recoil';
import { columnFlexbox } from '@styles/mixins/_flexbox';
import { isLocalGenerator } from '@recoil/generate';
import { textStyle } from '@styles/mixins/_text-style';

const Preview = () => {
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleClick = () => {
    setGenerator((prev: any) => ({ ...prev, done: true }));
  };
  return (
    <Base>
      <p>
        반가워요 유저님! <br />
        작성하신 내용을 확인해주세요!
        <br />
        펀딩 생성을 진행할까요 ?
      </p>
      <Button onClick={handleClick}>좋아요</Button>
    </Base>
  );
};

export default Preview;

const Base = styled.div`
  width: 100%;
  height: 50%;
  padding: 0 10px;
  margin-top: 150px;
  ${columnFlexbox('between', 'center')};

  > p {
    ${textStyle(24, '#333C4A')}
  }
`;
