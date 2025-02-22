import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import HomePage from "./pages/HomePage";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
};

export default App;
