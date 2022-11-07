export type PresentType = {
  to_name: string;
  from_name: string;
  contents: string;
  amount: number;
  image: string;
};

export type PresentApiType = {
  to_name: string;
  from_name: string;
  contents: string;
  amount: number;
  image: Blob;
};
