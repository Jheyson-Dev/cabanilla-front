import { gql } from "graphql-request";

export const createAllProductsQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
            query {
            getAllProducts {
                ${fieldsString}
            }
            }
        `;
};

export const createProductByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getProductById(id: ${id}) {
        ${fieldsString}
      }
    }
  `;
};
