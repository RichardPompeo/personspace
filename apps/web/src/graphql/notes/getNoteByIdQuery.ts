import { gql } from "@apollo/client";

const GET_NOTE_BY_ID_QUERY = gql`
  query GetNoteById($id: String!) {
    getNoteById(id: $id) {
      id
      title
      description
      color
      author {
        id
        displayName
      }
      shares {
        id
        personId
        person {
          id
          displayName
          email
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export default GET_NOTE_BY_ID_QUERY;
