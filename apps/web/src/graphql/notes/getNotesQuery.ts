import { gql } from "@apollo/client";

const GET_NOTES_QUERY = gql`
  query GetNotes {
    getNotes {
      authorId
      createdAt
      description
      title
      updatedAt
      color
      id
      author {
        displayName
        id
        email
      }
      comments {
        createdAt
        id
        message
        authorId
        noteId
        author {
          displayName
          id
          email
        }
      }
      shares {
        id
        personId
        noteId
        person {
          displayName
          id
          email
        }
      }
    }
  }
`;

export default GET_NOTES_QUERY;
