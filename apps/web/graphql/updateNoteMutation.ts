import { gql } from "@apollo/client";

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      authorId
      createdAt
      description
      title
      updatedAt
    }
  }
`;

export default UPDATE_NOTE_MUTATION;
