import React from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import styled from '@emotion/styled';
import { Global, ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SEO } from '@components/base';
import { GlobalStyle, theme } from '@styles/base';
import { TransitionWrapper } from '@components/layout';
import { useRouter } from 'next/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <Head>
              <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
              />
            </Head>
            <SEO />
            <Global styles={GlobalStyle} />
            <Wrapper>
              <BackgroundBlur></BackgroundBlur>
              <TransitionWrapper path={router.pathname}>
                <Component {...pageProps} />
              </TransitionWrapper>
            </Wrapper>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12);
`;

const BackgroundBlur = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url('/assets/images/SplashCenterCrop.png');
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(15px);
`;
