import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  displayName: string;

  @Field()
  firebaseId: string;

  @Field()
  email: string;
}
