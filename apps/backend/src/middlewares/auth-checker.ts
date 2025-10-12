import { AuthChecker } from "type-graphql";

import { Authorization } from "./authorization";

import { GraphQLContext } from "../types/context";

export const authChecker: AuthChecker<GraphQLContext> = async ({
  context: { bearerToken },
}) => {
  try {
    const result = await Authorization.verify(bearerToken);

    return result.success;
  } catch {
    return false;
  }
};
