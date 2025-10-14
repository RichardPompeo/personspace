import { Arg, Authorized, Ctx, Query, Resolver, Mutation } from "type-graphql";

import { randomUUID } from "node:crypto";

import { prisma } from "../helpers/prisma";

import { CreateUserInput } from "../dtos/inputs/users/CreateUserInput";
import { GetUserByEmailInput } from "../dtos/inputs/users/GetUserByEmailInput";
import { UpdateUserInput } from "../dtos/inputs/users/UpdateUserInput";
import { UserModel } from "../dtos/models/users/UserModel";
import { GetUserByEmailModel } from "../dtos/models/users/GetUserByEmailModel";

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
      email: input.email,
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
      email: null,
      displayName: createdUser.displayName,
      avatarUrl: null,
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
      avatarUrl: user.avatarUrl,
    };
  }

  @Authorized()
  @Query(() => GetUserByEmailModel)
  async getUserByEmail(
    @Ctx() context: GraphQLContext,
    @Arg("input") input: GetUserByEmailInput,
  ) {
    await Authorization.verify(context.bearerToken);

    const user = await prisma.users
      .findUnique({
        where: { email: input.email },
      })
      .catch((err) => {
        return {
          success: false,
          error: { code: err.code, message: err.message },
        };
      });

    return { success: true, user };
  }

  @Authorized()
  @Mutation(() => UserModel)
  async updateUser(
    @Ctx() context: GraphQLContext,
    @Arg("input") input: UpdateUserInput,
  ) {
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

    const updateData: {
      displayName?: string;
      avatarUrl?: string;
    } = {};

    if (input.displayName !== undefined) {
      updateData.displayName = input.displayName;
    }

    if (input.avatarUrl !== undefined) {
      updateData.avatarUrl = input.avatarUrl;
    }

    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: updateData,
    });

    return {
      id: updatedUser.id,
      email: payload.email,
      displayName: updatedUser.displayName,
      avatarUrl: updatedUser.avatarUrl,
    };
  }
}
