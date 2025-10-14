import { gql } from "@apollo/client";

const GET_SHARED_NOTES_QUERY = gql`
  query GetSharedNotes {
    getSharedNotes {
      id
      sharedAt
      note {
        authorId
        author {
          displayName
          email
          id
        }
        color
        description
        id
        title
        comments {
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
      }
    }
  }
`;

export default GET_SHARED_NOTES_QUERY;
