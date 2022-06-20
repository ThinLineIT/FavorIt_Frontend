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
<<<<<<< HEAD
    <Base>
      <Form onSubmit={handleSubmit}>
        <Description>언제까지 펀딩할까요?</Description>
        <br />
        <SelectorForm>
          <DateInput>
            <DatePicker
              inline
              locale={ko}
              selectsEnd
              dateFormat="yyyy년 MM월 dd (eee)"
              selected={endDate}
              startDate={startDate}
              minDate={startDate}
              onChange={(date: Date) => setEndDate(date)}
            />
          </DateInput>
        </SelectorForm>
      </Form>
    </Base>
=======
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
>>>>>>> generate-design-to-be
  );
};

export default Dates;
<<<<<<< HEAD

const Base = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;

const SelectorForm = styled.div`
  width: 100%;
  height: 350px;
  border: 2px dashed #8b95a1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Description = styled.p`
  ${textStyle(18, '#191e29')};
  text-align: center;
`;

const DateInput = styled.label`
  padding: 5px 8px;
  border: 1px solid gray;
  border-radius: 12px;
  ${textStyle(14)}
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${textStyle(13, '#8B95A1')};
  user-select: none;

  &:first-of-type {
    pointer-events: none;
    user-select: none;
  }

  &::after {
  }
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  width: 125px;
`;
=======
>>>>>>> generate-design-to-be
