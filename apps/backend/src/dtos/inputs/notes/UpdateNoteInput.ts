import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateNoteInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
