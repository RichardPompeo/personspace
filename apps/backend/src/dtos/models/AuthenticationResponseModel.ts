import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "./ErrorModel";
import { UserModel } from "./UserModel";

@ObjectType()
class AuthenticationUserResponse {
  @Field()
  uid: string;

  @Field()
  email: string;

  @Field()
  idToken: string;
}

@ObjectType()
export class AuthenticationResponseModel {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;

  @Field({ nullable: true })
  user: AuthenticationUserResponse;
}
