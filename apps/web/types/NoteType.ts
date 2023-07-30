import { UserType } from "./UserType";
import { NoteCommentType } from "./NoteCommentType";

export interface NoteType {
  id: string;
  authorId: string;
  title: string;
  description: string;
  color: string;
  updatedAt: string;
  createdAt: string;
  author: UserType;
  noteComment: NoteCommentType[];
}
