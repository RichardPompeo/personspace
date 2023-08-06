import { gql } from "@apollo/client";

const GET_SHARED_NOTES_QUERY = gql`
  query GetSharedNotes {
    getSharedNotes {
      id
      note {
        authorId
        author {
          displayName
          email
          id
        }
        color
        createdAt
        description
        id
        title
        updatedAt
        noteComment {
          author {
            displayName
            email
            id
          }
          authorId
          createdAt
          id
          message
          noteId
        }
        noteShare {
          id
          noteId
          personId
        }
      }
      noteId
      person {
        displayName
        email
        id
      }
      personId
    }
  }
`;

export default GET_SHARED_NOTES_QUERY;
