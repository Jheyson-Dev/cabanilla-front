import { gql } from "graphql-request";

export const createAllSuppliersQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
        query {
        getAllSuppliers {
            ${fieldsString}
        }
        }
    `;
};

export const createSupplierByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
        query {
        getSupplierById(id: ${id}) {
            ${fieldsString}
        }
        }
    `;
};
