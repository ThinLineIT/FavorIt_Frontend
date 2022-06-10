import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

import { textStyle } from '@styles/mixins/_text-style';

interface TextAreaProps {
  label: string;
  labelHidden?: boolean;
  name?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
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
    <div>
      <Label htmlFor={name} className={labelHidden ? 'visually-hidden' : ''}>
        {label}
      </Label>
      <TextAreaStyled
        id={name}
        {...register}
        placeholder={placeholder}
        rows={4}
        {...rest}
      />
    </div>
  );
}

const Label = styled.label`
  display: block;
  ${textStyle(14)};
  margin-bottom: 0.25rem;
  color: rgb(55 65 81);
  font-weight: 500;
`;

const TextAreaStyled = styled.textarea`
  margin-top: 0.25rem;
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid rgb(209 213 219);
  box-shadow: 0 4px 20px rgba(63, 65, 80, 0.3);

  &:focus {
    border-color: rgb(99 102 241);
  }
`;
