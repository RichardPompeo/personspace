import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpWithEmailAndPasswordInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
