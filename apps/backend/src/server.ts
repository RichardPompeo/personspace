import "reflect-metadata";

import { ApolloServer } from "apollo-server";

import path from "node:path";

import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/UserResolver";

import "./helpers/firebase";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
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
