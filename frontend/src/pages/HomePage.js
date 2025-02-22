import React from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";

const HomePage = () => {
  return (
    <div>
      <h1>GraphQL CRUD App</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default HomePage;
