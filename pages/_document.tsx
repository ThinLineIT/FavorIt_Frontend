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
          <NextScript />
          <div id="modal-root" />
          <div id="toast-root" />
        </body>
      </Html>
    );
  }
}
