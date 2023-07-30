import { Field, ObjectType } from "type-graphql";

import { UserModel } from "./UserModel";

@ObjectType()
export class NoteCommentModel {
  @Field()
  id: string;

  @Field()
  authorId: String;

  @Field(() => UserModel)
  author: UserModel;

  @Field()
  noteId: String;

  @Field()
  message: String;

  @Field()
  createdAt: Date;
}
