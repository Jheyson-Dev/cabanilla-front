import { GraphQLClient } from "graphql-request";

// Función para obtener el token de autenticación del usuario
function getAuthToken(): string {
  // Lógica para obtener el token de autenticación del usuario
  // Esto puede ser desde el almacenamiento local, una cookie, etc.
  return localStorage.getItem("authToken") || "";
}

// Crear una instancia del cliente GraphQL con los headers de autenticación
export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }
);
