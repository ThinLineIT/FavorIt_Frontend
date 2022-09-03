import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';

import { getCookie } from 'cookies-next';

const Home: NextPage = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const cookieToken = getCookie('COOKIE', { req, res });

  if (!cookieToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      isRootApproach: true,
    },
  };
};
