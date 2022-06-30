import type { ReactElement } from 'react';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): ReactElement {
    return (
      <Html lang="ko">
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
          {/* 폰트 */}
          <link
            rel="stylesheet"
            type="text/css"
            // href=""
          />
          {/* <GoogleAnalyticsScript /> */}
        </Head>
        <body>
          <Main />
          <div id="mt" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
