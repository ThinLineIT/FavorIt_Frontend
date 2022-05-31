import Image from 'next/image';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

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

const Button = styled.button`
  ${btnPrimary};
  ${btn48};
  margin: 10px 0px;
`;
const Button2 = styled.button`
  ${btnSecondary};
  ${btn48};
  margin: 10px 0px;
`;
const Button3 = styled.button`
  ${btnOutlined};
  ${btn48};
  margin: 10px 0px;
`;
const Button4 = styled.button`
  ${btnGhost};
  ${btn48};
  margin: 10px 0px;
`;

const Button5 = styled.button`
  ${btnPrimary};
  ${btn48};
  margin: 10px 0px;
`;

const FlexboxTest = styled.div`
  width: 100%;
  height: 284px;

  /* flexbox 사용 예시 */
  ${flexbox('center', 'center')} //
  column-gap: 24px;
  /* ${flexbox('start', 'center')} */ //
  /* ${columnFlexbox('start', 'center')} */
`;

const Avatar = styled.div`
  ${avatar_32}
`;

const Description = styled.h2`
  ${textStyle(16, 'teal')};
  /* ${textStyle(24, 'teal')}; */
`;
const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 임의로 로딩 상태 표현
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h2>
        <br />
        {/* 버튼 */}
        <Button>ZOOM</Button>
        <Button2>ZOOM</Button2>
        <Button3>ZOOM</Button3>
        <Button4>ZOOM</Button4>
        <Button5 disabled>ZOOM</Button5>
        <br />
        {/* 아바타 */}
        <FlexboxTest>
          {/* default, 유저 프로필 사진 없을 시 */}
          <Avatar />
          <Avatar>
            {/* 유저 프로필 사진 있을 시 */}
            <img src="https://picsum.photos/200/300" alt="avatar test" />
          </Avatar>
        </FlexboxTest>
        <Description>
          lorem ipsum dolor sit Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Odit amet iure officiis totam maxime quisquam
          laudantium minima culpa, quam assumenda hic modi eius.
        </Description>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
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
