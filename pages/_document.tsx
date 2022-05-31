import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
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
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
