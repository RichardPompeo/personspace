import { gql } from "@apollo/client";

const DELETE_NOTE_MUTATION = gql`
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      error {
        code
        message
      }
      success
    }
  }
`;

export default DELETE_NOTE_MUTATION;
