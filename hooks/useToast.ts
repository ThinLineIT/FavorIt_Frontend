import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

import { Toast, toastState } from '@recoil/common/toast';

export const DEFAULT_TRANSITION = 3000;
export const DURATION_TRANSITION = 600;

const useToast = () => {
  const setToasts = useSetRecoilState(toastState);

  const addToast = useCallback(
    (toast: Toast) => setToasts((prev) => [toast, ...prev]),
    [setToasts],
  );

  const removeToast = useCallback(
    (toastId: Toast['id']) =>
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId)),
    [setToasts],
  );

  const expireToast = useCallback(
    (toast: Toast) => {
      const expireTime = DURATION_TRANSITION + DEFAULT_TRANSITION;
      setTimeout(() => removeToast(toast.id), expireTime);
    },
    [removeToast],
  );

  const toast = useCallback<(msg: string) => void>(
    (msg) => {
      const newToast = { content: msg, id: v4() };
      addToast(newToast);
      expireToast(newToast);
    },
    [addToast, expireToast],
  );

  return toast;
};

export default useToast;
