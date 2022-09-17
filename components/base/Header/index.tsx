import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { flexbox } from '@styles/mixins/_flexbox';
import { textStyle } from 'styles/mixins/_text-style';

const Header = () => {
  const router = useRouter();
  return (
    <Base onClick={() => router.push('/')}>
      <Logo>FavorIt</Logo>
    </Base>
  );
};

export default Header;

const Base = styled.header`
  position: fixed;
  top: 0;
  padding-left: 0.8rem;
  max-width: 640px;
  width: 100%;
  padding: 1.5rem;
  ${flexbox('between', 'center')};
`;

const Logo = styled.h1`
  ${textStyle(18, 'darkgray')}
`;
