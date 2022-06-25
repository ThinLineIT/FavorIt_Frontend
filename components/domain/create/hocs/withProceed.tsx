import React, { useState } from 'react';

//  TODO: Check
// 1. Form이나 확인 버튼을 클릭 시 다음 컴포넌트로 이동할 수 있는 handleClickToMove 함수 있어야함
// 2  Form이나 확인 버튼을 클릭 시 page number 를 다시 설정해준다. ex. page-number = 3
// 3. page-number는 localStorage에 저장해두고, 유저가 중간에 그만둘 시 그 페이지 넘버를 기억해서 다음에 돌아올 때 바로 그 페이지로 이동시켜준다.
// 4. 각 컴포넌트에서 받는 유저의 데이터도 바로바로 저장을 해논다 (?)
// 5. 유저가 중간에 그만두려고 할 시, 토스에서 나오는 것처럼 '정말 뒤로 가시겠어요? 라는 간단한 UI의 모달창을 띄어주자. 아니요 괜찮아요 or 네 다시 만들래요'

const withProceed = (Component: any) => {
  const WithProceedComponent = (props: any) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

    // useEffect(() => {}, []);

    return isSuccess ? <Component {...props} /> : <p>Proceed...</p>;
  };

  return WithProceedComponent;
};

export default withProceed;
