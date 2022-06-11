import { atom } from 'recoil';

export const canGoBack = atom<boolean>({
  key: 'canGoBack',
  default: true,
});

export const isBottomNavigation = atom<boolean>({
  key: 'isBottomNavigation',
  default: false,
});
