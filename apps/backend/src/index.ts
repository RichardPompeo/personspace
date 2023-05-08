import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/UserResolver";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server);

  console.log(`🚀 HTTP server running on ${url}`);
};

bootstrap();
