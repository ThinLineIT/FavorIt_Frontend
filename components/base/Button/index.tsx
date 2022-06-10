import styled from '@emotion/styled';
import type { ReactNode, ReactElement } from 'react';
import { btnPrimary, btn48 } from '@styles/modules/_buttons';

// @Note
// 추후 추가적으로 작업

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}: ButtonProps): ReactElement => {
  return (
    <StyledButton className={className} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  ${btn48};
  ${btnPrimary};
  width: 100%;
`;
