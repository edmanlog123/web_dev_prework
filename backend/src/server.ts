import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mergedResolvers from "./graphql/resolvers";
import mergedTypeDefs from "./graphql/typeDefs";

// Explicitly type ApolloServer context as {}
const server = new ApolloServer<{}>
  ({ typeDefs: mergedTypeDefs, resolvers: mergedResolvers });

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({}), // required for type safety
  });
  console.log(`🚀 Server ready at ${url}`);
})();