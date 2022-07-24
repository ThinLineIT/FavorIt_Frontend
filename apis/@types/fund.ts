interface ProductTypes {
  link: string;
  option: string;
  price: number;
}

export type addFundFormType = {
  name: string;
  contents: string;
  due_date: string;
  product: ProductTypes;
};

export type FundDetailsData = {
  name: string;
  contents: string;
  state: string;
  is_maker: boolean;
  due_date: string;
  progress_percent: number;
  link_for_sharing: string;
  product: ProductTypes[];
};

export interface FundDetailTypes {
  data: FundDetailsData;
  message: string;
}

export interface FundSuccessPayload {
  data: FundDetailTypes[];
}

export type formGeneratorType = {
  page: number;
  done: boolean;
  proceed: boolean;
  funding_id?: string;
};

export type addPaymentTypes = {
  amount: number;
};

export type Bank = {
  text: string;
  value: string;
  image: string;
};

export type CheckBanksTypes = {
  bank_code: string;
  account_number: string;
};

export type AccountInfo = {
  account_owner_name: string;
};

export interface BankAccount {
  data: AccountInfo;
  message: string;
}
