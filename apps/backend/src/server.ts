import "reflect-metadata";

import path from "node:path";
import express from "express";
import http from "http";
import cors from "cors";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express4";

import { buildSchema } from "type-graphql";

import { AuthenticationResolver } from "./resolvers/AuthenticationResolver";
import { UserResolver } from "./resolvers/UserResolver";

import { authChecker } from "./middlewares/auth-checker";

import "./helpers/firebase-admin";
import "./helpers/firebase";

import { GraphQLContext } from "./types/context";

const bootstrap = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [AuthenticationResolver, UserResolver],
    validate: { forbidUnknownValues: false },
    authChecker,
    emitSchemaFile: path.resolve(__dirname, "../schema.gql"),
  });

  const server = new ApolloServer<GraphQLContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "http://localhost:5173",
        "https://personspace.vercel.app",
        "https://*.personspace.vercel.app",
      ],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const bearerToken = req.headers.authorization ?? "";
        return { bearerToken } satisfies GraphQLContext;
      },
    }),
  );

  const port = Number(process.env.PORT ?? 4000);

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 HTTP server running on http://localhost:${port}`);
  console.log(
    `🔍 GraphQL endpoint available at http://localhost:${port}/graphql`,
  );
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
