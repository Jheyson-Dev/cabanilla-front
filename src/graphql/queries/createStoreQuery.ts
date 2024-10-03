import { gql } from "graphql-request";

export const createAllStoreQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");

  return gql`query {
    getAllStores{
        ${fieldsString}
        }
    }`;
};

export const createStoreByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");

  return gql`query {
    getStoreById(id:${id}){
        ${fieldsString}
        }
    }`;
};
