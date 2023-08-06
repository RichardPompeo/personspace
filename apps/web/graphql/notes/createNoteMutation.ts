import { gql } from "@apollo/client";

const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
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

export default CREATE_NOTE_MUTATION;
