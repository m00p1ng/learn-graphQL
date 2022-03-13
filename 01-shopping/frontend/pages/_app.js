import { ApolloProvider } from "@apollo/client";

import Page from '../components/Page'
import { useApollo } from "../lib/apolloClient";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps)

  return (
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  )
}

MyApp.getServerSideProps = async function ({ Component, ctx }) {
  console.log({ ctx })
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default MyApp
