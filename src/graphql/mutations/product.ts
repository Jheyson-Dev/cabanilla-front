import { gql } from "graphql-request";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($data: CreateProductDto!) {
    createProduct(data: $data) {
      id
      name
      description
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($id: Int!, $data: UpdateProductDto!) {
    updateProduct(id: $id, data: $data) {
      id
    }
  }
`;
