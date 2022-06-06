// API 통해 받아오는 데이터에 대한 타입 정리
export interface User {
  id: number;
  phone: number;
  email: string;
  name: string;
  avatar: string;
  createdAt: number;
  updatedAt: number;
  tokens: string;
  //   products: ;
  //   posts;
  //   answers;
  //   wonderings;
  //   writtenReviews;
  //   receivedReviews;
  //   fav;
  //   purchases;
  //   Message;
  // ...
}
