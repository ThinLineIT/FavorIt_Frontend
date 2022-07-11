interface ProductTypes {
  link: string;
  option: string;
  price: number;
}

export interface FundDetailTypes {
  data: {
    name: string;
    contents: string;
    state: string;
    is_maker: boolean;
    due_date: string;
    progress_percent: number;
    link_for_sharing: string;
    product: ProductTypes[];
  };
  message: string;
}

export interface FundSuccessPayload {
  data: FundDetailTypes[];
}

export type addPresentTypes = {
  amount: number;
};
