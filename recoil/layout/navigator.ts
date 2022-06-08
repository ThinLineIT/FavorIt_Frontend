import { atom } from 'recoil';

export const isTopGoBack = atom<boolean>({
  key: 'isTopGoBack',
  default: true,
});

export const isBottomNavigation = atom<boolean>({
  key: 'isBottomNavigation',
  default: false,
});
