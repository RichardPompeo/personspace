import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "../app/ErrorModel";
import { UserModel } from "./UserModel";

@ObjectType()
export class GetUserByEmailModel {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;

  @Field({ nullable: true })
  user: UserModel;
}
