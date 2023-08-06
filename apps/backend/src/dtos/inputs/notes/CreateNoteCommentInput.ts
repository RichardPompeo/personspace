import { Field, InputType } from "type-graphql";

@InputType()
export class CreateNoteCommentInput {
  @Field()
  authorId: string;

  @Field()
  noteId: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
