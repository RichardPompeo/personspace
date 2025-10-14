import { gql } from "@apollo/client";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      displayName
      email
      avatarUrl
    }
  }
`;

export default UPDATE_USER_MUTATION;
