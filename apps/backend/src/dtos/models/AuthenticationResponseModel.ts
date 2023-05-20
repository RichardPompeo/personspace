import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "./ErrorModel";
import { UserModel } from "./UserModel";

@ObjectType()
export class AuthenticationResponseModel {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;

  @Field({ nullable: true })
  user: UserModel;
}
