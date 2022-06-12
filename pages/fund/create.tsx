import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';

import { GoBack } from '@components/layout';
import { GeneratorType, isLocalGenerator } from '@recoil/create';

// @Note 추후 분리하기
const Crawling = dynamic(
  () => import('@components/domain/create/page-components/Crawling'),
  { ssr: false },
);
const Options = dynamic(
  () => import('@components/domain/create/page-components/Options'),
  { ssr: false },
);
const Price = dynamic(
  () => import('@components/domain/create/page-components/Price'),
  { ssr: false },
);
const Title = dynamic(
  () => import('@components/domain/create/page-components/Title'),
  { ssr: false },
);
const Description = dynamic(
  () => import('@components/domain/create/page-components/Description'),
  { ssr: false },
);
const Date = dynamic(
  () => import('@components/domain/create/page-components/Date'),
  { ssr: false },
);
const Preview = dynamic(
  () => import('@components/domain/create/page-components/Preview'),
  { ssr: false },
);

const hocComponents = [
  { page: 0, component: <Crawling /> },
  { page: 1, component: <Options /> },
  { page: 2, component: <Price /> },
  { page: 3, component: <Title /> },
  { page: 4, component: <Description /> },
  { page: 5, component: <Date /> },
  { page: 6, component: <Preview /> },
];

const Generate = () => {
  const router = useRouter();
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  useEffect(() => {
    if (generator.done === true) {
      router.replace('/fund/123');
    }
  }, [generator, router]);

  // @Note
  // 개별 컴포넌트에 setGenerator를 넘겨 page-number를 +1 해주거나 리셋해준다.
  // 마지막 컴포넌트에서는 generator.done === true로 줘서 완료시킨다.
  // 이에 대해서는 hoc를 활용해보려고 생각중
  return (
    <>
      <GoBack
        currying={() => {
          generator.page > 0
            ? setGenerator((prev: GeneratorType) => ({
                ...prev,
                page: prev.page - 1,
              }))
            : router.replace('/');
        }}
      />
      {hocComponents[generator.page].component}
    </>
  );
};

export default Generate;
