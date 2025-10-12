import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteShareInput {
  @Field()
  noteId: string;

  @Field()
  personId: string;
}
