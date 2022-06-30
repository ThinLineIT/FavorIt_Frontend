import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { SEO } from '@components/base';
import { GlobalStyle, theme } from '@styles/base';
import { LayoutWrapper } from '@components/layout';

// React Query의 QueryClient 설정, 나중에 추가할 예정입니다.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <meta
              httpEquiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />
          </Head>
          <SEO />
          <Global styles={GlobalStyle} />
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
