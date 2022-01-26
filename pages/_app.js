import Router from 'next/router';

import { AuthProvider } from '../lib/contexts/AuthContext';
import { useState } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setProgress(true);
    //function will fired when route change started
  });

  Router.events.on('routeChangeComplete', () => {
    setProgress(false);
    //function will fired when route change ended
  });

  TopBarProgress.config({
    shadowBlur: 0,
    barThickness: 3,
  });

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <AuthProvider>
        {progress && <TopBarProgress />}
        {page}
      </AuthProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
