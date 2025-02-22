import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int!) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;
