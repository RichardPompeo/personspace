import { AuthChecker } from "type-graphql";

import { Authorization } from "./authorization";

import { GraphQLContext } from "../types/context";

export const authChecker: AuthChecker<GraphQLContext> = async ({
  context: { bearerToken },
}) => {
  try {
    await Authorization.verify(bearerToken);

    return true;
  } catch {
    return false;
  }
};
