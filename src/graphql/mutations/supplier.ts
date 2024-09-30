import { gql } from "graphql-request";

export const CREATE_SUPPLIER_MUTATION = gql`
  mutation createSupplier($data: CreateSupplierDto!) {
    createSupplier(data: $data) {
      id
    }
  }
`;

export const UPDATE_SUPPLIER_MUTATION = gql`
  mutation updateSupplier($id: Int!, $data: UpdateSupplierDto!) {
    updateSupplier(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_SUPPLIER_MUTATION = gql`
  mutation deleteSupplier($id: Int!) {
    deleteSupplier(id: $id) {
      id
    }
  }
`;
