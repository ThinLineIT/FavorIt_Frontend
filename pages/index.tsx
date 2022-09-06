import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import type { NextPage } from 'next';

import { COOKIE } from '@util/cookie';

import { getCookie } from 'cookies-next';

const Home: NextPage = () => {
  const router = useRouter();

  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const cookieToken = getCookie(COOKIE.ACCESS_TOKEN, { req, res });

  console.log(req);

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
