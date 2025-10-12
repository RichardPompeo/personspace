import "reflect-metadata";

import path from "node:path";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { buildSchema } from "type-graphql";

import { AuthenticationResolver } from "./resolvers/AuthenticationResolver";
import { UserResolver } from "./resolvers/UserResolver";

import { authChecker } from "./middlewares/auth-checker";

import "./helpers/firebase-admin";
import "./helpers/firebase";

import { GraphQLContext } from "./types/context";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [AuthenticationResolver, UserResolver],
    validate: { forbidUnknownValues: false },
    authChecker,
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
  });

  const server = new ApolloServer<GraphQLContext>({
    schema,
  });

  const { url } = await startStandaloneServer<GraphQLContext>(server, {
    listen: {
      port: Number(process.env.PORT ?? 4000),
    },
    context: async ({ req }) => {
      const bearerToken = req.headers.authorization ?? "";

      return { bearerToken } satisfies GraphQLContext;
    },
  });

  console.log(`🚀 HTTP server running on ${url}`);
  console.log(`🔍 GraphQL endpoint available at ${url}graphql`);
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
