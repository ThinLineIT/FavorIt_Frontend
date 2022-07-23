import { atom } from 'recoil';

import { addFundFormType, formGeneratorType } from '@apis/@types/fund';

export const isFundingForm = atom<addFundFormType>({
  key: 'isFundingForm',
  default: {
    name: '',
    contents: '',
    due_date: '',
    product: {
      link: '',
      option: '',
      price: 0,
    },
  },
});

export const isLocalGenerator = atom<formGeneratorType>({
  key: 'isLocalGenerator',
  default: {
    page: 0,
    done: false,
    proceed: false,
  },
});
