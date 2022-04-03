// import BaseDocument from 'next/document';
import { withEmotionCache } from 'tss-react/nextJs';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '@ui-components/theme';
import { createMuiCache } from './_app';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default withEmotionCache({
  Document: MyDocument,
  getCaches: () => [createMuiCache()],
});
