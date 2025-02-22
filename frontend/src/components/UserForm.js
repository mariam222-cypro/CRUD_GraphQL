import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";
import { TextField, Button } from "@mui/material";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleCreateUser = async () => {
    await createUser({ variables: { name, email, age: parseInt(age) } });
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleCreateUser}>Add User</Button>
    </div>
  );
};

export default UserForm;
