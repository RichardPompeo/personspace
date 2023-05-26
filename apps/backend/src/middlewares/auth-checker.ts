import { AuthChecker } from "type-graphql";

import { Authorization } from "./authorization";

interface ContextType {
  bearerToken: string;
}

export const authChecker: AuthChecker<ContextType> = async ({
  context: { bearerToken },
}) => {
  try {
    await Authorization.verify(bearerToken);

    return true;
  } catch {
    return false;
  }
};
