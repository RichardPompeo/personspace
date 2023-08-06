import { Field, ObjectType } from "type-graphql";

import { UserModel } from "../users/UserModel";
import { NoteModel } from "./NoteModel";

@ObjectType()
export class NoteShareModel {
  @Field()
  id: string;

  @Field()
  personId: String;

  @Field(() => UserModel, { nullable: true })
  person: UserModel;

  @Field()
  noteId: String;

  @Field(() => NoteModel, { nullable: true })
  note: NoteModel;
}
