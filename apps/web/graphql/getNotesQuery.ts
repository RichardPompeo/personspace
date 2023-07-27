import { gql } from "@apollo/client";

const GET_NOTES_QUERY = gql`
  query GetNotes {
    getNotes {
      id
      authorId
      createdAt
      description
      title
      color
      updatedAt
    }
  }
`;

export default GET_NOTES_QUERY;
