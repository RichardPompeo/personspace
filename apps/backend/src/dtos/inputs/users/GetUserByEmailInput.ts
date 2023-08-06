import { Field, InputType } from "type-graphql";

@InputType()
export class GetUserByEmailInput {
  @Field()
  email: string;
}
