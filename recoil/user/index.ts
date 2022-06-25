import { atom } from 'recoil';

export const userInfo = atom<boolean>({
  key: 'userInfo',
  default: true,
});
