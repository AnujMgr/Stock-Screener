import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module

import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/index.css';

import { useRouter } from 'next/router';
import { AuthProvider } from '../lib/contexts/AuthContext';
import { appRoutes } from '../utils/constants';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  let unprotectedRoutes = [
    appRoutes.LOGIN_PAGE,
    appRoutes.REGISTER_PAGE,
    // appRoutes.HOME_PAGE,
  ];
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <AuthProvider>
        {/* <RouteGuard router={router} pathIsProtected={pathIsProtected}> */}
        {page}
        {/* {!pathIsProtected ? (
            <Layout>{page}</Layout>
          ) : router.pathname.startsWith('/company/') ? (
            <StockLayout>{page}</StockLayout>
          ) : router.pathname.startsWith('/mutual-fund/') ? (
            <StockLayout>{page}</StockLayout>
          ) : (
            <Layout>{page}</Layout>
          )} */}
        {/* </RouteGuard> */}
      </AuthProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
