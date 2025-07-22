// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

// 🔧 Initialize the Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // ✅ Replace with your backend GraphQL URI
  cache: new InMemoryCache(),
  credentials: "include", // Optional: only if your backend uses sessions/cookies
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
