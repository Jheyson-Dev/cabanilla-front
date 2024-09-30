import { gql } from "graphql-request";

export const createAllCategoryQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");

  return gql`
    query {
      getAllCategories{
        ${fieldsString}
      }
    }
  `;
};

export const createCategoryByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getCategoryById(id: ${id}) {
        ${fieldsString}
      }
    }
  `;
};
