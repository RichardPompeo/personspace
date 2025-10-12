import { NoteType } from "./NoteType";
import { UserType } from "./UserType";

export interface NoteShareType {
  id: string;
  personId: string;
  person: UserType;
  noteId: string;
  note: NoteType;
}
