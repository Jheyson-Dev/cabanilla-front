import { GraphQLClient } from "graphql-request";

// Crear una instancia del cliente GraphQL con los headers de autenticación
export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  }
);
