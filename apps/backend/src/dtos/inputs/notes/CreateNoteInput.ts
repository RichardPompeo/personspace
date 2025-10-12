import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  color: string;
}
