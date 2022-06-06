import { atom } from 'recoil';

export const isTopNavigation = atom<boolean>({
  key: 'isTopNavigation',
  default: true,
});
