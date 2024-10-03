import { gql } from "graphql-request";

export const createAllKardexQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`query {
    getAllInventoryMovements{
        ${fieldsString}
        }
    }`;
};
