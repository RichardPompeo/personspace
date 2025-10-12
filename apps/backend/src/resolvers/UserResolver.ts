import { Arg, Authorized, Ctx, Query, Resolver, Mutation } from "type-graphql";

import { randomUUID } from "node:crypto";

import { prisma } from "../helpers/prisma";

import { CreateUserInput } from "../dtos/inputs/CreateUserInput";
import { UserModel } from "../dtos/models/UserModel";

import { Authorization } from "../middlewares/authorization";
import { GraphQLContext } from "../types/context";

@Resolver()
export class UserResolver {
  @Mutation(() => UserModel)
  async createUser(@Arg("input") input: CreateUserInput) {
    const user = {
      id: randomUUID(),
      firebaseId: input.firebaseId,
      displayName: input.displayName,
    };

    const createdUser = await prisma.users
      .create({ data: user })
      .catch((err) => {
        if (err.code === "P2002") {
          throw new Error(`Duplicated field '${err.meta?.target[0]}'`);
        }
        throw err;
      });

    return {
      id: createdUser.id,
      email: null, // Email will be provided by Firebase context when needed
      displayName: createdUser.displayName,
    };
  }

  @Authorized()
  @Query(() => UserModel)
  async getUser(@Ctx() context: GraphQLContext) {
    const payload = await Authorization.verify(context.bearerToken);

    if (!payload.success) {
      throw new Error(payload.error?.message || "Authorization failed");
    }

    const user = await prisma.users.findUnique({
      where: { firebaseId: payload.uid },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      email: payload.email,
      displayName: user.displayName,
    };
  }
}
