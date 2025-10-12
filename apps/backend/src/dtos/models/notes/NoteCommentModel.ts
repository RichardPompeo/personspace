import { Field, ObjectType } from "type-graphql";

import { UserModel } from "../users/UserModel";

@ObjectType()
export class NoteCommentModel {
  @Field()
  id: string;

  @Field()
  authorId: string;

  @Field(() => UserModel)
  author: UserModel;

  @Field()
  noteId: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
