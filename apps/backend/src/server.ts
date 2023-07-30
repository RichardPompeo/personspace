import "reflect-metadata";

import { ApolloServer } from "apollo-server";

import path from "node:path";

import { buildSchema } from "type-graphql";

import { AuthenticationResolver } from "./resolvers/AuthenticationResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { NotesResolver } from "./resolvers/NotesResolver";
import { NoteCommentsResolver } from "./resolvers/NoteCommentsResolver";

import { authChecker } from "./middlewares/auth-checker";

import "./helpers/firebase-admin";
import "./helpers/firebase";

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [
      AuthenticationResolver,
      UserResolver,
      NotesResolver,
      NoteCommentsResolver,
    ],
    validate: { forbidUnknownValues: false },
    authChecker: authChecker,
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
  });

  const server = new ApolloServer({
    cors: {
      origin: "*",
      exposedHeaders: ["content-type"],
    },
    schema,
    context: ({ req }) => {
      const bearerToken = req.headers.authorization;

      return { bearerToken };
    },
  });

  const { url } = await server.listen();

  console.log(`🚀 HTTP server running on ${url}`);
};

bootstrap();
