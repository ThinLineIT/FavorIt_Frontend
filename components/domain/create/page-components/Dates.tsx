import ko from 'date-fns/locale/ko';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { registerLocale } from 'react-datepicker';

registerLocale('ko', ko);

import { dateToString } from '@util/index';
import { Calendar } from '@components/base';
import { flexbox } from '@styles/mixins/_flexbox';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';

const Form = styled.form`
  width: 100%;
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  animation: ${smoothAppearDownUp} 300ms;

  & > div {
    min-width: 100% !important;
    ${flexbox()}
  }
`;
const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  margin-top: 25px;
`;

const Dates = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [fundingForm, setFundingForm] = useRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const onChange = (dates: Date[]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (endDate) {
      setFundingForm((prev: FormType) => ({
        ...prev,
        due_date: dateToString(endDate),
      }));
      setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  useEffect(() => {
    if (fundingForm?.due_date !== '') {
      setEndDate(() => new Date(fundingForm?.due_date));
    }
  }, [fundingForm?.due_date]);

  return (
    <Form
      onSubmit={handleSubmit}
      role="tabpanel"
      aria-labelledby="pagination-tab-5"
      aria-label="펀딩 기간 입력"
    >
      <Calendar startDate={startDate} endDate={endDate} onChange={onChange} />
      <NextButton>다음</NextButton>
    </Form>
  );
};

export default React.memo(Dates);
