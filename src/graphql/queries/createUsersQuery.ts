import { gql } from "graphql-request";

export const createAllUsersQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getAllUsers {
        ${fieldsString}
      }
    }
  `;
};
