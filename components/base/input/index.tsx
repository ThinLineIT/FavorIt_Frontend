import styled from '@emotion/styled';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { flexbox } from '@styles/mixins/_flexbox';
import { textStyle } from '@styles/mixins/_text-style';

// ## react-hook-form
// less code
// better validation
// better erros (set, clear, display)
// have control over inputs (react-hook-form은 성능을 위해 uncontrolled 방법을 default로 사용, but controlled input을 사용하는 것 같은 경험을 선사함)
// don't deal with events
// easier inputs

interface InputProps {
  label: string;
  labelHidden?: boolean;
  name: string;
  kind?: 'text' | 'phone' | 'price';
  register: UseFormRegisterReturn;
  required: boolean;
  type: string;
  placeholder?: string;
}

export default function Input({
  label,
  labelHidden = false,
  name,
  kind = 'text',
  register,
  type,
  required,
  placeholder,
}: InputProps) {
  return (
    <Base>
      <Label htmlFor={name} className={labelHidden ? 'visually-hidden' : ''}>
        {label}
      </Label>
      {kind === 'text' ? (
        <Wrapper>
          <InputStyled
            id={name}
            required={required}
            autoComplete="off"
            {...register}
            type={type}
            placeholder={placeholder}
          />
        </Wrapper>
      ) : null}
      {kind === 'price' ? (
        <Wrapper>
          <InputStyled
            id={name}
            required={required}
            autoComplete="off"
            {...register}
            type={type}
            placeholder={placeholder}
          />
          <Currency>
            <span>KRW</span>
          </Currency>
        </Wrapper>
      ) : null}
      {kind === 'phone' ? (
        <PhoneWrapper>
          <CountryCode>+82</CountryCode>
          <InputStyled
            id={name}
            required={required}
            autoComplete="off"
            {...register}
            type={type}
            placeholder={placeholder}
          />
        </PhoneWrapper>
      ) : null}
    </Base>
  );
}

const Base = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  ${textStyle(14, 'rgb(55 65 81)')};
  font-weight: 500;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 6px;
`;

const InputStyled = styled.input`
  width: 100%;
  appearance: none;
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 10px 12px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(63, 65, 80, 0.3);
  &:focus {
    border-color: rgb(55 65 81, 0.7);
  }
  &::placeholder {
    color: rgb(156 163 175);
  }
`;

const Currency = styled.div`
  position: absolute;
  right: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
  > span {
    color: rgb(107 114 128);
  }
`;

const PhoneWrapper = styled.div`
  display: flex;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(63, 65, 80, 0.3);
`;

const CountryCode = styled.span`
  ${flexbox()};
  ${textStyle(14, 'rgb(107 114 128)')};
  padding: 0 12px;
  border-width: 1px;
  border-color: rgb(209 213 219);
  border-right-width: 0px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: rgb(249 250 251);
  user-select: none;
`;
