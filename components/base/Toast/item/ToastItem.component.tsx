import React, { useState, useEffect } from 'react';

import { Toast } from '@recoil/common/toast';
import * as S from './ToastItem.styled';

export const DEFAULT_TRANSITION = 3000;

const ToastItem = ({ content }: Toast) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const setExistTimeout = setTimeout(() => {
      setIsClosing(true);
    }, DEFAULT_TRANSITION);

    return () => {
      clearTimeout(setExistTimeout);
    };
  }, []);

  return (
    <S.ToastWrapper isClosing={isClosing}>
      <S.Container role="status">
        <span>{content}</span>
      </S.Container>
    </S.ToastWrapper>
  );
};

export default ToastItem;
