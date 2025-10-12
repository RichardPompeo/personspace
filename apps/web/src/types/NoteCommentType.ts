import { UserType } from "./UserType";

export interface NoteCommentType {
  id: string;
  authorId: string;
  author: UserType;
  noteId: string;
  message: string;
  createdAt: string;
}
