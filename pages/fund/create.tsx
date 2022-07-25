import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { GoBack } from '@components/layout';
import UpperPagination from '@components/base/Pagination';
import hocComponents from '@components/domain/create/static/hocTable';
import { formGeneratorType } from '@apis/@types/fund';
import { isLocalGenerator } from '@recoil/create';
import { columnFlexbox } from '@styles/mixins/_flexbox';

const Generate = () => {
  const router = useRouter();
  const [generator, setGenerator] = useRecoilState(isLocalGenerator);

  const handleChapterClick = (idx: number) => () => {
    setGenerator((prev: formGeneratorType) => ({
      ...prev,
      page: idx,
    }));
  };

  const goBackCurrying = () => {
    generator.page > 0
      ? setGenerator((prev: formGeneratorType) => ({
          ...prev,
          page: prev.page - 1,
        }))
      : router.replace('/');
  };

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
          <UpperPagination
            list={Array.from({ length: 6 })}
            chapterNum={generator.page}
            handleChapterClick={handleChapterClick}
          />
        )}
        <FormWrapper>{hocComponents[generator.page].component}</FormWrapper>
      </Base>
      {generator.page !== 2 && <GoBack currying={goBackCurrying} />}
    </>
  );
};

export default Generate;

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin-top: 50px;
  ${columnFlexbox('start', 'center')};
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
