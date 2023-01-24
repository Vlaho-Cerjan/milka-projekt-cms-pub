import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../app/utility/createEmotionCache';
import '../app/styles/globals.scss';
import CustomThemeProvider from '../app/store/customThemeContext';
import { LanguageProvider } from '../app/store/languageContext';
import { ModeProvider } from '../app/store/modeContext';
import Layout from '../app/components/layout/layout';
import { SnackbarProvider } from 'notistack';
import { Router } from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    session: Session;
  }
}

const clientSideEmotionCache = createEmotionCache();

const progress = new ProgressBar(
  {
    size: 4,
  }
)

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  Router.events.on("routeChangeStart", () => {
    progress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    progress.finish();
  });
  Router.events.on("routeChangeError", () => {
    progress.finish();
  });
  return (
    <SessionProvider session={pageProps.session}>
      <ModeProvider>
        <LanguageProvider>
          <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: "right", vertical: "top" }} variant="success" >
            <CacheProvider value={emotionCache}>
              <CustomThemeProvider>
                <Layout>
                  <>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </>
                </Layout>
              </CustomThemeProvider>
            </CacheProvider>
          </SnackbarProvider>
        </LanguageProvider>
      </ModeProvider>
    </SessionProvider>
  );
};

export default MyApp;