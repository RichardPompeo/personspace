import { gql } from "@apollo/client";

const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      id
      authorId
      createdAt
      description
      updatedAt
      title
      color
    }
  }
`;

export default UPDATE_NOTE_MUTATION;
