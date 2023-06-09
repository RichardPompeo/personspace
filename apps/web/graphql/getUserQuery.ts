import { gql } from "@apollo/client";

const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      displayName
      email
      id
    }
  }
`;

export default GET_USER_QUERY;
