import { Field, ObjectType } from "type-graphql";

import { ErrorModel } from "./ErrorModel";

@ObjectType()
export class ResponseModel {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  error: ErrorModel;
}
