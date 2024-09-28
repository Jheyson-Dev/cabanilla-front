import { gql } from "graphql-request";

export const createAllRolsQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query{
        getAllRols{
            ${fieldsString}
        }
    }`;
};

export const createRolByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getRolById(id: ${id}) {
        ${fieldsString}
      }
    }
  `;
};
