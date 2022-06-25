import { atom } from 'recoil';

type Product = {
  link: string;
  option: string;
  price: number;
};

export type FormType = {
  name: string;
  contents: string;
  due_date: string;
  product: Product;
};

export type GeneratorType = {
  page: number;
  done: boolean;
  proceed: boolean;
};

export const isFundingForm = atom<FormType>({
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

export const isLocalGenerator = atom<GeneratorType>({
  key: 'isLocalGenerator',
  default: {
    page: 0,
    done: false,
    proceed: false,
  },
});
