import { gql } from "@apollo/client";

const GET_USER_BY_EMAIL_QUERY = gql`
  query GetUserByEmail($input: GetUserByEmailInput!) {
    getUserByEmail(input: $input) {
      error {
        code
        message
      }
      success
      user {
        displayName
        email
        id
      }
    }
  }
`;

export default GET_USER_BY_EMAIL_QUERY;
