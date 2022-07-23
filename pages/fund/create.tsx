import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { GoBack } from '@components/layout';
import { isLocalGenerator } from '@recoil/create';
import { formGeneratorType } from '@apis/@types/fund';
import { columnFlexbox, flexbox } from '@styles/mixins/_flexbox';

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
  cursor: pointer;
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
      router.replace({
        pathname: '/fund/get-started',
        query: { id: generator?.funding_id },
      });
    }
  }, [generator, router]);

  return (
    <>
      <Base role="region">
        <h1 className="visually-hidden">펀딩 생성</h1>
        {generator.page !== 6 && (
          <Pagination role="tablist">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Chapter
                key={idx}
                role="tab"
                done={generator.page > idx}
                id={`pagination-tab-${idx}`}
                active={generator.page === idx}
                onClick={() =>
                  generator.page > idx &&
                  setGenerator((prev: formGeneratorType) => ({
                    ...prev,
                    page: idx,
                  }))
                }
              />
            ))}
          </Pagination>
        )}
        {hocComponents[generator.page].component}
      </Base>
      {generator.page !== 6 && (
        <GoBack
          currying={() => {
            generator.page > 0
              ? setGenerator((prev: formGeneratorType) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              : router.replace('/');
          }}
        />
      )}
    </>
  );
};

export default Generate;
