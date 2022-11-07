import React from 'react';
import { useRecoilValue } from 'recoil';

import { toastState } from '@recoil/common/toast';
import * as S from './Toast.styled';
import Portal from '../Portal';
import ToastItem from './item/ToastItem.component';

const Toast = () => {
  const toasts = useRecoilValue(toastState);

  return (
    <Portal elementId="toast-root" mounted={!!toasts.length}>
      <S.Wrapper>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} {...toast} />
        ))}
      </S.Wrapper>
    </Portal>
  );
};

export default Toast;
