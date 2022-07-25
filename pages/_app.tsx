import React from 'react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SEO } from '@components/base';
import { GlobalStyle, theme } from '@styles/base';
import { LayoutWrapper } from '@components/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
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
            <LayoutWrapper>
              <Component {...pageProps} />
              <div id="portal"></div>
            </LayoutWrapper>
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
