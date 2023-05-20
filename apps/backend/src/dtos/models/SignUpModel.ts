import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "./ErrorModel";
import { UserModel } from "./UserModel";

@ObjectType()
export class SignUpResponseModel {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;

  @Field({ nullable: true })
  user: UserModel;
}
