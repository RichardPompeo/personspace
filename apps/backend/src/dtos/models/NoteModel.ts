import { Field, ObjectType } from "type-graphql";

import { NoteCommentModel } from "./NoteCommentModel";
import { UserModel } from "./UserModel";

@ObjectType()
export class NoteModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  color: string;

  @Field(() => [NoteCommentModel], { nullable: true })
  noteComment: NoteCommentModel[];

  @Field(() => UserModel)
  author: UserModel;

  @Field({ nullable: true })
  authorId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
