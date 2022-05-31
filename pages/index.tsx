import Image from 'next/image';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useState } from 'react';

import styles from 'styles/Home.module.css';
import { avatar_32 } from 'styles/modules/_avatars';
import { flexbox, columnFlexbox } from 'styles/mixins/_flexbox';
import { textStyle } from 'styles/mixins/_text-style';
import {
  btn48,
  btnPrimary,
  btnSecondary,
  btnOutlined,
  btnGhost,
} from 'styles/modules/_buttons';
import Modal from 'components/Modal';

const Button = styled.button`
  ${btnPrimary};
  ${btn48};
  margin: 10px 0px;
`;
const Button2 = styled(Button)`
  ${btnSecondary};
`;
const Button3 = styled(Button)`
  ${btnOutlined};
`;
const Button4 = styled(Button)`
  ${btnGhost};
`;
const Button5 = styled(Button)`
  ${btnPrimary};
`;

const FlexboxTest = styled.div`
  width: 100%;
  height: 56px;

  /* flexbox  */
  ${flexbox('end', 'center')} //
  column-gap: 24px;
  /* ${flexbox('start', 'center')} */ //
  /* ${columnFlexbox('start', 'center')} */
`;

const Avatar = styled.div`
  ${avatar_32}
`;

const Description = styled.h2`
  /* ${textStyle(16)} */
  ${textStyle(18, 'tomato')}
`;

const ButtonClose = styled.button`
  width: 280px;
  height: 68px;
  border-radius: 12px;
  color: #fff;
  background-color: #3d6afe;
  margin: 0;
  border: none;
  font-size: 24px;
  &:active {
    opacity: 0.8;
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
`;

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* 플렉스 박스 */}
        {/* 아바타 */}
        <FlexboxTest>
          {/* default, 유저 프로필 사진 없을 시 */}
          <Avatar />
          {/* 유저 프로필 사진 있을 시 */}
          <Avatar>
            <img src="https://picsum.photos/200/300" alt="avatar test" />
          </Avatar>
        </FlexboxTest>
        <h2 className={styles.title}>Welcome!</h2>
        <br />

        {/* 모달  */}
        <ButtonClose onClick={handleOpen}>Modal Open</ButtonClose>
        <Modal isOpen={isOpen} onClose={handleClose} selector="#modal">
          <ModalBody>
            <h2>Title</h2>
            <p>Description</p>
          </ModalBody>
        </Modal>
        <br />

        {/* 버튼 */}
        <Button>ZOOM</Button>
        <Button2>ZOOM</Button2>
        <Button3>ZOOM</Button3>
        <Button4>ZOOM</Button4>
        <Button5 disabled>ZOOM</Button5>
        <br />

        {/* 텍스트 스타일 */}
        <Description>
          “나는 치킨도 안 먹는데 허니 콤보 & 웨지감자 기프티콘만 10만원이
          넘어요” 아마 많은 생일 선물은 카카오톡 기프티콘으로 대체하고 있죠,
          주기 쉽고 받기 쉽고 랭킹이 있다는 이유로 다만, 받는 사람이 필요하지
          않는 선물을 받을 수도 있어요
        </Description>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
