import { gql } from "graphql-request";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($data: CreateCategoryDto!) {
    createCategory(data: $data) {
      id
      name
      description
      status
    }
  }
`;
export const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategory($id: Int!, $data: UpdateCategoryDto!) {
    updateCategory(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`;
