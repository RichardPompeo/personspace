import { Field, InputType } from "type-graphql";

@InputType()
export class DeleteNoteInput {
  @Field()
  id: string;
}
