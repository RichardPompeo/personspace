import { gql } from "@apollo/client";

const GET_SHARED_NOTE_BY_ID_QUERY = gql`
  query GetSharedNoteById($id: String!) {
    getSharedNoteById(id: $id) {
      id
      personId
      note {
        id
        title
        description
        color
        authorId
        author {
          id
          displayName
        }
      }
      sharedAt
    }
  }
`;

export default GET_SHARED_NOTE_BY_ID_QUERY;
