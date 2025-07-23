import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
    }
  }
`;