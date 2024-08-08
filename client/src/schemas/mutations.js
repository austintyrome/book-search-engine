import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

// Define the SIGNUP_USER mutation
export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;