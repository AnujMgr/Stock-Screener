import "../styles/index.css";
import { ThemeProvider } from "next-themes";

import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { useApollo } from "../lib/apollo/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { AppWrapper } from "../lib/contexts/State";

import { useRouter } from "next/router";

import DashboardLayout from "../components/layout/DashboardLayout";
import Layout from "../components/layout";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">
          {router.pathname.startsWith("/company/") ? (
            <DashboardLayout>{page}</DashboardLayout>
          ) : (
            <Layout>{page}</Layout>
          )}
        </ThemeProvider>
      </ApolloProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
