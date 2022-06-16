import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSetRecoilState } from 'recoil';

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

const Dates = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
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
    if (startDate) {
      setFundingForm((prev: FormType) => ({
        ...prev,
        due_date: dateToString(startDate),
      }));
      setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
    } else {
      alert('날짜를 입력해 주세요');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SelectorForm>
        <Description>언제까지 펀딩할까요?</Description>
        <DateInput>2022년 6월 13일 부터</DateInput>
        <DateInput>
          <DatePicker
            selectsEnd
            dateFormat="yyyy년 MM월 dd일까지"
            selected={endDate}
            startDate={startDate}
            minDate={startDate}
            onChange={(date: Date) => setEndDate(date)}
          />
        </DateInput>
      </SelectorForm>
      <div>
        <br />
      </div>
      <NextButton>다음</NextButton>
    </Form>
  );
};

export default Dates;

const Form = styled.form`
  width: 100%;
  display: block;
  animation: ${smoothAppearDownUp} 300ms;
`;

const SelectorForm = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #8b95a1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Description = styled.p`
  ${textStyle(18, '#8B95A1')};
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
