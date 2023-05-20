import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorModel {
  @Field()
  code: string;

  @Field()
  message: string;
}
