import { gql } from "@apollo/client";

const CREATE_NOTE_SHARE_MUTATION = gql`
  mutation CreateNoteShare($input: CreateNoteShareInput!) {
    createNoteShare(input: $input) {
      success
      error {
        code
        message
      }
      id
      noteId
      personId
      person {
        displayName
        email
      }
    }
  }
`;

export default CREATE_NOTE_SHARE_MUTATION;
