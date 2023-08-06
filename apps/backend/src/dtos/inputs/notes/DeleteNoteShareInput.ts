import { InputType, Field } from "type-graphql";

@InputType()
export class DeleteNoteShareInput {
  @Field()
  id: string;
}
