import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

import { textStyle } from '@styles/mixins/_text-style';

interface TextAreaProps {
  name: string;
  label?: string;
  register: UseFormRegisterReturn;
  labelHidden?: boolean;
  [key: string]: any;
}

export default function TextArea({
  name,
  label,
  register,
  labelHidden = false,
  ...restProps
}: TextAreaProps) {
  return (
    <Base>
      <Label htmlFor={name} className={labelHidden ? 'visually-hidden' : ''}>
        {label || name}
      </Label>
      <TextAreaStyled
        rows={2}
        id={name}
        autoFocus
        {...register}
        {...restProps}
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
  padding: 12px;
  box-shadow: -1px 1px 2px rgba(255, 255, 255, 0.25),
    inset 1px 1px 2px rgba(0, 0, 0, 0.25) !important;
  border-radius: 10px;
  ${textStyle(16, '#191e29')}

  &::placeholder {
    /* color: rgb(156 163 175); */
    ${textStyle(16, '#727272')}
  }
`;
