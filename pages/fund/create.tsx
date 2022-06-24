import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';

import { GoBack } from '@components/layout';
import { GeneratorType, isLocalGenerator } from '@recoil/create';
import styled from '@emotion/styled';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';
import { posCenter, posCenterX } from '@styles/mixins/_positions';

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

const Dates = dynamic(
  () => import('@components/domain/create/page-components/Dates'),
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
  { page: 5, component: <Dates /> },
  { page: 6, component: <Preview /> },
];

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin-top: 50px;
  ${columnFlexbox('start', 'center')};
`;

const Pagination = styled.div`
  width: 100%;
  ${flexbox()};
  flex-shrink: 1;
  flex-grow: 0;
  margin-bottom: 50px;
  column-gap: 26px;
`;

const Chapter = styled.div<{ active: boolean; done: boolean }>`
  width: 24px;
  height: 24px;
  position: relative;
  border: 1px solid #92d2ff;
  border-radius: calc((22px + 22px) / 2);
  background-color: ${({ active, done }) =>
    active || done ? (active && !done ? '#E6F6FF' : '#92d2ff') : '#fff'};

  transform: ${({ active }) => (active ? 'scale(1.4)' : 'none')};
  transition: background-color 200ms ease-in-out, transform 200ms ease-in-out;

  &:not(:last-child)::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% + (24px / 2));
    width: 25px;
    border: 0.5px solid #92d2ff;
  }
`;

const Generate = () => {
  const router = useRouter();
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  useEffect(() => {
    if (generator.done === true) {
      router.replace('/fund/1');
    }
  }, [generator, router]);

  // @Note
  // 개별 컴포넌트에 setGenerator를 넘겨 page-number를 +1 해주거나 리셋해준다.
  // 마지막 컴포넌트에서는 generator.done === true로 줘서 완료시킨다.
  // 이에 대해서는 hoc를 활용해보려고 생각중
  return (
    <>
      <Base>
        <Pagination>
          {hocComponents.map((ctx, idx) => (
            <Chapter
              key={idx}
              active={generator.page === idx}
              done={generator.page > idx}
            />
          ))}
        </Pagination>
        {hocComponents[generator.page].component}
      </Base>
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
    </>
  );
};

export default Generate;
