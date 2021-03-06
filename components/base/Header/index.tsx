import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';
import { useRouter } from 'next/router';

import { textStyle } from 'styles/mixins/_text-style';

const Base = styled.header`
  position: fixed;
  top: 0;
  /* z-index: ${({ theme }) => theme.zIndexes.gnb_level}; */
  padding-left: 0.8rem;
  max-width: 640px;
  width: 100%;
  padding: 1.5rem;
  ${flexbox('between', 'center')};
`;

const Logo = styled.h1`
  ${textStyle(18, 'darkgray')}
`;

const Bell = styled.button`
  > svg {
    color: lightGray;
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const Header = () => {
  const router = useRouter();
  return (
    <Base onClick={() => router.push('/')}>
      <Logo>FavorIt</Logo>
      <Bell>
        <svg
          fill="lightGray"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" />
        </svg>
      </Bell>
    </Base>
  );
};

export default Header;
