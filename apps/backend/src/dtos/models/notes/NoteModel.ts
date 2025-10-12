import { Field, ObjectType } from "type-graphql";

import { NoteCommentModel } from "./NoteCommentModel";
import { UserModel } from "../users/UserModel";
import { NoteShareModel } from "./NoteShareModel";

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
  comments: NoteCommentModel[];

  @Field(() => [NoteShareModel], { nullable: true })
  shares: NoteShareModel[];

  @Field(() => UserModel)
  author: UserModel;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
