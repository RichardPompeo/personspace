import { gql } from "@apollo/client";

const SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION = gql`
  mutation SignUpWithEmailAndPassword(
    $input: SignUpWithEmailAndPasswordInput!
  ) {
    signUpWithEmailAndPassword(input: $input) {
      error {
        code
        message
      }
      success
      user {
        email
        idToken
        uid
      }
    }
  }
`;

export default SIGN_UP_WITH_EMAIL_AND_PASSWORD_MUTATION;
