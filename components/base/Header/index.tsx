import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { textStyle } from 'styles/mixins/_text-style';

const Base = styled.header`
  width: 100%;
  padding: 12px;
  border: 1px solid lightgrey;
  border-radius: 8px;
`;

const Logo = styled.h1`
  ${textStyle(24)};
  color: teal;
  cursor: pointer;
  display: inline-block;
  transition: color 200ms ease-out;

  &:hover {
    color: tomato;
  }
`;

const Header = () => {
  const router = useRouter();
  return (
    <Base onClick={() => router.push('/')}>
      <Logo>FavorIt</Logo>
    </Base>
  );
};

export default Header;
