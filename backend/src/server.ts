import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import mergedResolvers from "./graphql/resolvers";
import mergedTypeDefs from "./graphql/typeDefs";


import { connectDB } from "./db/connectDB";


const app = express();
const httpServer = http.createServer(app);

const MongoStore = connectMongo(session);

if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set in environment variables.");
const store = new MongoStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});


store.on("error", (error) => {
  console.log(error);
});

if (!process.env.SESSION_SECRET) throw new Error("SESSION_SECRET is not set in environment variables.");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
}));

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
      context: async ({ req, res }) => ({ token: req.headers.token, res }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );
  await connectDB();
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();
