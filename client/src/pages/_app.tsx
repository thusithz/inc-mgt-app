/* eslint-disable @typescript-eslint/no-explicit-any */
import 'src/styles/globals.css';

import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@ui-components/theme';
import { AppContextWrapper } from '@utils/context/appContext';
import Notification from '@ui-components/Notification/Notification';
import { getSession, SessionProvider } from 'next-auth/react';
import App from 'next/app';
import createCache from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';

let muiCache: EmotionCache | undefined;

// eslint-disable-next-line no-return-assign
export const createMuiCache = () => (muiCache = createCache({ key: 'mui', prepend: true }));

interface ExtendAppProps extends AppProps {
  session: any;
}

function MyApp({ Component, pageProps }: ExtendAppProps) {
  return (
    // ToDo: Add session to default page props

    <SessionProvider
      session={pageProps.session}
      baseUrl={process.env.NEXT_PUBLIC_NEXTAUTH_URL}
      refetchInterval={0}
    >
      <AppContextWrapper initialState={{}}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <title>Incident Management System</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <CacheProvider value={muiCache ?? createMuiCache()}>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Notification />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </AppContextWrapper>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx } = context;
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context);
  const session = await getSession(ctx);

  return {
    ...appProps,
    pageProps: { ...appProps.pageProps, session },
  };
};

export default MyApp;
