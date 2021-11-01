import { ThemeProvider } from "next-themes";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module

import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/index.css";
import "../styles/rsuite-table.css";

import { useApollo } from "../lib/apollo/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { AppWrapper } from "../lib/contexts/State";
import { useRouter } from "next/router";
import SecondaryLayout from "../components/layout/SecondaryLayout";
import Layout from "../components/layout";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ApolloProvider client={client}>
        <AppWrapper>
          <ThemeProvider attribute="class">
            {router.pathname.startsWith("/company/") ? (
              <SecondaryLayout>{page}</SecondaryLayout>
            ) : (
              <Layout>{page}</Layout>
            )}
          </ThemeProvider>
        </AppWrapper>
      </ApolloProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
