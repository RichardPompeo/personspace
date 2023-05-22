import { Arg, Resolver } from "type-graphql";

import { randomUUID } from "node:crypto";

import { prisma } from "../helpers/prisma";

import { CreateUserInput } from "../dtos/inputs/CreateUserInput";

@Resolver()
export class UserResolver {
  static async createUser(@Arg("input") input: CreateUserInput) {
    const user = {
      id: randomUUID(),
      firebaseId: input.firebaseId,
      displayName: input.displayName,
    };

    await prisma.users.create({ data: user }).catch((err) => {
      if (err.code === "P2002") {
        throw Error(`Duplicated field '${err.meta?.target[0]}'`);
      }
    });

    return user;
  }
}
