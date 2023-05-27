import { ObjectType, Field } from "type-graphql";

import { ErrorModel } from "./ErrorModel";

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  email: string;
}
