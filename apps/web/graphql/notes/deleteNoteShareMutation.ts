import { gql } from "@apollo/client";

const DELETE_NOTE_SHARE_MUTATION = gql`
  mutation DeleteNoteShare($input: DeleteNoteShareInput!) {
    deleteNoteShare(input: $input) {
      success
      error {
        code
        message
      }
    }
  }
`;

export default DELETE_NOTE_SHARE_MUTATION;
