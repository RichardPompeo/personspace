import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpWithEmailAndPasswordInput {
  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  password: string;
}
