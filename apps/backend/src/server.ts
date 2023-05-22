import "reflect-metadata";

import { ApolloServer } from "apollo-server";

import path from "node:path";

import { buildSchema } from "type-graphql";

import { AuthenticationResolver } from "./resolvers/AuthenticationResolver";

import "./helpers/firebase";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [AuthenticationResolver],
    validate: { forbidUnknownValues: false },
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
  });

  const server = new ApolloServer({
    cors: {
      origin: "*",
      exposedHeaders: ["content-type"],
    },
    schema,
  });

  const { url } = await server.listen();

  console.log(`🚀 HTTP server running on ${url}`);
};

bootstrap();
