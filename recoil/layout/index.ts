import { atom } from 'recoil';

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
