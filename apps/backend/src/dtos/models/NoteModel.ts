import { Field, ObjectType } from "type-graphql";

import { ErrorModel } from "./ErrorModel";

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

  @Field({ nullable: true })
  authorId: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
