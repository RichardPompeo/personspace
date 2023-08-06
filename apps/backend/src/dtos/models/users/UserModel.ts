import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  email: string;
}
