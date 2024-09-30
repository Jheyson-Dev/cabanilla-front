import { gql } from "graphql-request";

export const createAllAreaQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");

  return gql`
    query {
      getAllAreas{
        ${fieldsString}
      }
    }
  `;
};

export const createAreaByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getAreaById(id: ${id}) {
        ${fieldsString}
      }
    }
  `;
};
