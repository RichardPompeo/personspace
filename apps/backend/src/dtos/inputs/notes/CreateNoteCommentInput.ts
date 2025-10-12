import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteCommentInput {
  @Field()
  noteId: string;

  @Field()
  message: string;
}
