import { gql } from "@apollo/client";

const SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION = gql`
  mutation SignInWithEmailAndPassword(
    $input: SignInWithEmailAndPasswordInput!
  ) {
    signInWithEmailAndPassword(input: $input) {
      success
      user {
        email
        idToken
        uid
      }
      error {
        code
        message
      }
    }
  }
`;

export default SIGN_IN_WITH_EMAIL_AND_PASSWORD_MUTATION;
