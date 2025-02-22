import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const client = new ApolloClient({
  uri: "http://localhost:4000", // Node.js Proxy
  cache: new InMemoryCache(),
});

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
    setUsers(data.getUsers);
  };

  const handleCreateUser = async () => {
    await client.mutate({
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
      variables: { name, email, age: parseInt(age) },
    });
    setName("");
    setEmail("");
    setAge("");
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>GraphQL CRUD App</h1>
      <div style={{ marginBottom: "20px" }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleCreateUser}>Add User</Button>
      </div>
      {users.map((user) => (
        <Card key={user.id} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Age: {user.age}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default App;
