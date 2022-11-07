import styled from '@emotion/styled';
import type { ReactNode, ReactElement } from 'react';
import { btnPrimary, btn48 } from '@styles/modules/_buttons';

// @Note
// 추후 추가적으로 작업

export interface ConfirmButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  label,
  className,
  onClick,
  ...rest
}: ConfirmButtonProps): ReactElement => {
  return (
    <StyledButton className={className} onClick={onClick} {...rest}>
      {label}
    </StyledButton>
  );
};

export default ConfirmButton;

const StyledButton = styled.button`
  ${btn48};
  ${btnPrimary};
  width: 100%;
`;
