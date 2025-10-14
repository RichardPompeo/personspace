import { Field, ObjectType } from "type-graphql";

import { UserModel } from "../users/UserModel";
import { NoteModel } from "./NoteModel";

@ObjectType()
export class NoteShareModel {
  @Field()
  id: string;

  @Field()
  personId: string;

  @Field(() => UserModel, { nullable: true })
  person: UserModel;

  @Field()
  noteId: string;

  @Field(() => NoteModel, { nullable: true })
  note: NoteModel;

  @Field(() => Date)
  sharedAt: Date;
}
