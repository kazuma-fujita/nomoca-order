import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { I18n } from 'aws-amplify';
import { AppProps } from 'next/app';
import PropTypes from 'prop-types';
import 'styles/globals.css';
import theme from 'styles/theme';
import { SWRConfig } from 'swr';
import createEmotionCache from 'utilities/create-emotion-cache';
import { L10n } from 'utilities/l10n';
import { loggingMiddleware } from 'utilities/logging-middleware';
import { CurrentUserContextProvider, useCurrentUser } from '../stores/use-current-user';
import Amplify from 'aws-amplify';
import awsconfig from 'aws-exports';

I18n.setLanguage('ja'); // Add
I18n.putVocabularies(L10n); // Add

Amplify.configure(awsconfig);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { currentUser, error, groups } = useCurrentUser();
  return (
    <CurrentUserContextProvider>
      <SWRConfig value={{ use: [loggingMiddleware] }}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </SWRConfig>
    </CurrentUserContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
