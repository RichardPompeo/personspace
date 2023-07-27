import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";

import { randomUUID } from "node:crypto";

import { prisma } from "../helpers/prisma";

import { CreateUserInput } from "../dtos/inputs/CreateUserInput";
import { UserModel } from "../dtos/models/UserModel";

import { Authorization } from "../middlewares/authorization";

@Resolver()
export class UserResolver {
  static async createUser(@Arg("input") input: CreateUserInput) {
    const user = {
      id: randomUUID(),
      firebaseId: input.firebaseId,
      displayName: input.displayName,
    };

    await prisma.user.create({ data: user }).catch((err) => {
      if (err.code === "P2002") {
        throw Error(`Duplicated field '${err.meta?.target[0]}'`);
      }
    });

    return user;
  }

  @Authorized()
  @Query(() => UserModel)
  async getUser(@Ctx() context: { bearerToken: string }) {
    const payload = await Authorization.verify(context.bearerToken);

    const user = await prisma.user.findUnique({
      where: { firebaseId: payload.uid },
    });

    return { id: user.id, email: payload.email, displayName: user.displayName };
  }
}
