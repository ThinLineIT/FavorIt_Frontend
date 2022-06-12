import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';
import {
  FormType,
  GeneratorType,
  isFundingForm,
  isLocalGenerator,
} from '@recoil/create';
import { btn48, btnPrimary } from '@styles/modules/_buttons';
import { smoothAppearDownUpLarge } from '@styles/modules/_keyframes';

const Date = () => {
  const dateRef = useRef<HTMLInputElement>(null);
  const setFundingForm = useSetRecoilState(isFundingForm);
  const setGenerator = useSetRecoilState(isLocalGenerator);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dates = dateRef.current?.value;
    if (dates) {
      setFundingForm((prev: FormType) => ({
        ...prev,
        due_date: dates,
      }));
      setGenerator((prev: GeneratorType) => ({ ...prev, page: prev.page + 1 }));
    } else {
      alert('날짜를 입력해 주세요');
    }
  };
  return (
    <Base onSubmit={handleSubmit}>
      <Input type="date" ref={dateRef} />
      <NextButton>다음</NextButton>
    </Base>
  );
};

export default Date;

const Base = styled.form`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin-top: 150px;
  ${flexbox('center', 'start')};
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  cursor: pointer;
  border-radius: 12px;
  background-color: #ffffff;
`;

const NextButton = styled.button`
  ${btnPrimary};
  ${btn48}
  position: absolute;
  bottom: 125px;
  width: 125px;
`;
