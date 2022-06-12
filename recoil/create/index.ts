import { atom } from 'recoil';

type Product = {
  link: string;
  options: string;
  price: number;
};

export type FormType = {
  name: string;
  contents: string;
  due_date: string;
  product: Product;
  recipient_name: string;
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
      options: '',
      price: 0,
    },
    recipient_name: '',
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
