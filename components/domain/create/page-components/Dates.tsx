import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
registerLocale('ko', ko);
import { useSetRecoilState } from 'recoil';
import { getMonth, getDate } from 'date-fns';

import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import { textStyle } from '@styles/mixins/_text-style';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { smoothAppearDownUp } from '@styles/modules/_keyframes';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { flexbox } from '@styles/mixins/_flexbox';

const Form = styled.form`
  width: 100%;
  display: block;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  animation: ${smoothAppearDownUp} 300ms;
`;

const DateWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const Description = styled.p`
  ${textStyle(18, '#8B95A1')};
  text-align: center;
`;

const DateInput = styled.label`
  ${flexbox()}
  ${textStyle(13, '#8B95A1')};
  padding: 5px 8px;
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
  margin-top: 200px;
`;

const MyContainer = ({ className, children }: any) => {
  return (
    <>
      <Description>언제까지 펀딩할까요?</Description>
      <DateWrapper>{children}</DateWrapper>
    </>
  );
};

const Dates = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const setFundingForm = useSetRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const dateToString = (date: Date) => {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    );
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

  return (
    <Form onSubmit={handleSubmit}>
      <DatePicker
        startDate={startDate}
        minDate={new Date()}
        selected={startDate}
        endDate={endDate}
        selectsRange
        inline
        onChange={onChange}
        // calendarContainer={MyContainer}
        // dayClassName={(d) =>
        //   getDate(d) === getDate(startDate) &&
        //   getMonth(d) === getMonth(startDate)
        //     ? 'normal-day selected-day'
        //     : 'normal-day'
        // }
      />
      <NextButton>다음</NextButton>
    </Form>
  );
};

export default Dates;
