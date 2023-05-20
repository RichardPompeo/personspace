import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "./ErrorModel";

@ObjectType()
export class UserModel {
  @Field()
  uid: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  idToken: string;
}
