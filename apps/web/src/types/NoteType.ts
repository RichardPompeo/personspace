import { UserType } from "./UserType";
import { NoteCommentType } from "./NoteCommentType";
import { NoteShareType } from "./NoteShareType";

export interface NoteType {
  id: string;
  authorId: string;
  title: string;
  description: string;
  color: string;
  updatedAt: string;
  createdAt: string;
  author: UserType;
  comments: NoteCommentType[];
  shares: NoteShareType[];
}
