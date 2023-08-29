import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteInput {
  @Field()
  authorId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  color: string;

  @Field()
  createdAt: Date;
}