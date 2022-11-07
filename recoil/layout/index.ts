import { atom, selector } from 'recoil';

export const canGoBack = atom<boolean>({
  key: 'canGoBack',
  default: true,
});

export const isBottomNavigation = atom<boolean>({
  key: 'isBottomNavigation',
  default: false,
});

export const isMainFullHeight = atom<boolean>({
  key: 'isMainFullHeight',
  default: false,
});

export const isShowModalState = atom<boolean>({
  key: 'modal/isShowModalState',
  default: false,
});

export const modalComponentState = atom<React.ReactElement | null>({
  key: 'modal/modalComponentState',
  default: null,
});

type ToastStateType = {
  id: string;
  type: 'SUCCESS' | 'ERROR' | '';
  content: string;
};

export const toastState = atom<ToastStateType[]>({
  key: 'toast/toastState',
  default: [],
});

export const isShowToastState = selector({
  key: 'toast/isShowToastState',
  get: ({ get }) => {
    const toasts = get(toastState);

    return toasts.length > 0 ? true : false;
  },
});
