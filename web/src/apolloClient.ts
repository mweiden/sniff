// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "http://localhost:80/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listPosts: relayStylePagination(),
        },
      },
    },
  }),
});

export default client;
