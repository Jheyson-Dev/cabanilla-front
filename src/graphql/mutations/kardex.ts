import { gql } from "graphql-request";

export const CREATE_KARDEX_MUTATION = gql`
  mutation createInventoryMovement($data: CreateInventoryMovementDto!) {
    createInventoryMovement(data: $data) {
      id
    }
  }
`;
