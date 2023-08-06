import { NoteType } from "./NoteType";
import { UserType } from "./UserType";

export interface NoteCommentType {
  id: string;
  authorId: string;
  author: UserType;
  noteId: string;
  note: NoteType;
  message: string;
  createdAt: string;
}
