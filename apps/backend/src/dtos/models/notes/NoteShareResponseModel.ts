import { Field, ObjectType } from "type-graphql";

import { ErrorModel } from "../app/ErrorModel";
import { UserModel } from "../users/UserModel";
import { NoteModel } from "./NoteModel";

@ObjectType()
export class NoteShareResponseModel {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  personId: string;

  @Field(() => UserModel, { nullable: true })
  person: UserModel;

  @Field({ nullable: true })
  noteId: string;

  @Field(() => NoteModel, { nullable: true })
  note: NoteModel;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;
}
