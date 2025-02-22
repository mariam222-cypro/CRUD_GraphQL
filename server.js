const express = require("express");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const GRAPHQL_API_URL = "http://localhost:8000/graphql";
const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

// Fetch users
app.get("/users", async (req, res) => {
  try {
    const { data } = await client.query({
      query: gql`
        query {
          getUsers {
            id
            name
            email
            age
          }
        }
      `,
    });
    res.json(data.getUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateUser($name: String!, $email: String!, $age: Int!) {
          createUser(name: $name, email: $email, age: $age) {
            id
            name
            email
            age
          }
        }
      `,
      variables: { name, email, age },
    });
    res.json(data.createUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Node.js proxy running on port ${PORT}`);
});
