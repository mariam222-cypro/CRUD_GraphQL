import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";
import "./styles.css"; // Import global styles

// Initialize Apollo Client to connect with the GraphQL backend
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Render the App component inside the ApolloProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
