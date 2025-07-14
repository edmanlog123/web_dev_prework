import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

import mergedResolvers from "./graphql/resolvers";
import mergedTypeDefs from "./graphql/typeDefs";

const app = express();
const httpServer = http.createServer(app);

import dotenv from 'dotenv';
import { connectDB } from "./db/connectDB";

dotenv.config();

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers as any,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server.start();

  // ✅ Only call expressMiddleware after server has started
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  await connectDB();
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
