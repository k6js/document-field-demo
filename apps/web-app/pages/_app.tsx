import React from 'react';
import getConfig from 'next/config';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const {
  publicRuntimeConfig: { serverUrl },
} = getConfig();

const client = new ApolloClient({
  uri: `${serverUrl}/api/graphql`,
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
