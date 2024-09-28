import { gql } from "graphql-request";

export const CREATE_ROL_MUTATION = gql`
  mutation createRol($data: CreateRolDto!) {
    createRol(data: $data) {
      id
      name
      status
    }
  }
`;

export const UPDATE_ROL_MUTATION = gql`
  mutation updateRol($id: Int!, $data: UpdateRolDto!) {
    updateRol(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_ROL_MUTATION = gql`
  mutation deleteRol($id: Int!) {
    deleteRol(id: $id) {
      id
    }
  }
`;
