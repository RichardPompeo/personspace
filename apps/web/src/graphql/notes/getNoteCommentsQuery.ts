import { gql } from "@apollo/client";

const GET_NOTE_COMMENTS_QUERY = gql`
  query GetNoteComments($noteId: String!) {
    getNoteComments(noteId: $noteId) {
      id
      message
      author {
        id
        displayName
        avatarUrl
      }
      createdAt
    }
  }
`;

export default GET_NOTE_COMMENTS_QUERY;
