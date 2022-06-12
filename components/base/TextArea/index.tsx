import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

import { textStyle } from '@styles/mixins/_text-style';

interface TextAreaProps {
  name: string;
  register: UseFormRegisterReturn;
  label?: string;
  labelHidden?: boolean;
  placeholder?: string;
  [key: string]: any;
}

export default function TextArea({
  label,
  labelHidden = false,
  name,
  register,
  placeholder,
  ...rest
}: TextAreaProps) {
  return (
    <Base>
      <Label htmlFor={name} className={labelHidden ? 'visually-hidden' : ''}>
        {label || name}
      </Label>
      <TextAreaStyled
        id={name}
        {...register}
        placeholder={placeholder}
        rows={1}
        {...rest}
      />
    </Base>
  );
}

const Base = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  ${textStyle(14, '#8B95A1')};
  font-weight: 500;
`;

const TextAreaStyled = styled.textarea`
  width: 100%;
  resize: none;
  padding: 10px 1px;
  border-bottom: 1.5px solid lightgray;
  ${textStyle(18, '#191e29')}

  &:focus {
  }

  &::placeholder {
    /* color: rgb(156 163 175); */
    ${textStyle(18, '#191e29')}
  }
`;
