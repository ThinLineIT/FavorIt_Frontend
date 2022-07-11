import React from 'react';
import styled from '@emotion/styled';

import { KEYPAD_LABELS } from '@constants/static/fund';
import { flexbox } from '@styles/mixins/_flexbox';

const Keypad = ({ ...restProps }) => {
  return (
    <KeypadWrapper>
      {KEYPAD_LABELS.map((item) => (
        <Key key={item.key} id={`keypad-${item.label}`} {...restProps}>
          {item.key}
        </Key>
      ))}
    </KeypadWrapper>
  );
};

export default Keypad;

const KeypadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
`;
const Key = styled.span`
  ${flexbox()};
  cursor: pointer;
  font-weight: 400;
  font-size: 25px;
  line-height: 30px;
  user-select: none;
`;
