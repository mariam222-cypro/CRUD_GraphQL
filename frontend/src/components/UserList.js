import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";
import { Card, CardContent, Typography } from "@mui/material";

const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getUsers.map((user) => (
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

export default UserList;
