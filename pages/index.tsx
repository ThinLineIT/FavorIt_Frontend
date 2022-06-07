import styled from '@emotion/styled';
import type { NextPage } from 'next';

import { Modal } from '@components/base';
import useModal from '@hooks/useCardModal';
import { LandingBox } from '@components/domain/home';
import { posCenter } from '@styles/mixins/_positions';
import { textStyle } from '@styles/mixins/_text-style';
import { columnFlexbox } from '@styles/mixins/_flexbox';

const Main = styled.main`
  ${posCenter()};
  ${columnFlexbox()};
  ${textStyle(18, 'teal')};
  row-gap: 12px;
  padding: 18px;
  cursor: pointer;
  font-weight: 700;
  transition: color 200ms ease-out;

  &:hover {
    color: tomato;
  }
`;

const ModalBody = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-height: calc(100vh - 16px);
  overflow: hidden auto;
  position: relative;
  padding-block: 12px;
  padding-inline: 24px;

  > h2 {
    color: teal;
  }
  > p {
    color: tomato;
    font-weight: 500;
  }
`;

const Home: NextPage = () => {
  const { isOpen, showModal, hideModal } = useModal();

  return (
    <>
      <Main onClick={showModal}>
        <LandingBox />
      </Main>
      <Modal isOpen={isOpen} onClose={hideModal} selector="#mt">
        <ModalBody>
          <h2>Hello !!</h2>
          <p>Happy Hacking ;</p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
