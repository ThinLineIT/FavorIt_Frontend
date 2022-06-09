import { atom } from 'recoil';

export type generatorType = {
  page: number;
  done: boolean;
  proceed: boolean;
};

export const isLocalGenerator = atom<generatorType>({
  key: 'isLocalGenerator',
  default: {
    page: 0,
    done: false,
    proceed: false,
  },
});
