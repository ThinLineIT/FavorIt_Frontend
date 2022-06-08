import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { isLocalGenerator } from '@recoil/generate';
import { useRouter } from 'next/router';

// @Note 추후 분리하기
const Crolling = dynamic(
  () => import('@components/domain/generate/page-components/Crolling'),
  { ssr: false },
);
const Options = dynamic(
  () => import('@components/domain/generate/page-components/Options'),
  { ssr: false },
);
const Price = dynamic(
  () => import('@components/domain/generate/page-components/Price'),
  { ssr: false },
);
const Title = dynamic(
  () => import('@components/domain/generate/page-components/Title'),
  { ssr: false },
);
const Description = dynamic(
  () => import('@components/domain/generate/page-components/Description'),
  { ssr: false },
);
const Date = dynamic(
  () => import('@components/domain/generate/page-components/Date'),
  { ssr: false },
);

const hocComponents = [
  {
    page: 0,
    component: <Crolling />,
  },
  {
    page: 1,
    component: <Options />,
  },
  {
    page: 2,
    component: <Price />,
  },
  {
    page: 3,
    component: <Title />,
  },
  {
    page: 4,
    component: <Description />,
  },
  {
    page: 5,
    component: <Date />,
  },
];

const Generate = () => {
  const router = useRouter();
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  useEffect(() => {
    if (generator.done === true) {
      router.replace('/fund/detail');
    }
  }, [router, generator, setGenerator]);
  // @Note
  // 개별 컴포넌트에 setGenerator를 넘겨 page-number를 +1 해주거나 리셋해준다.
  // 마지막 컴포넌트에서는 generator.done === true로 줘서 완료시킨다.
  // 이에 대해서는 hoc를 활용해보려고 생각중
  return <>{hocComponents[generator.page].component}</>;
};

export default Generate;
