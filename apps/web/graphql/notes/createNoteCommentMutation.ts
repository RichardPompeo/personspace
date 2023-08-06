import { gql } from "@apollo/client";

const CREATE_NOTE_COMMENT_MUTATION = gql`
  mutation CreateNoteComment($input: CreateNoteCommentInput!) {
    createNoteComment(input: $input) {
      authorId
      createdAt
      id
      message
      noteId
      author {
        displayName
        email
        id
      }
    }
  }
`;

export default CREATE_NOTE_COMMENT_MUTATION;
