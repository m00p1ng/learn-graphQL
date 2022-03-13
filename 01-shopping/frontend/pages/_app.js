import { ApolloProvider } from "@apollo/client";

import Page from '../components/Page'
import client from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp
