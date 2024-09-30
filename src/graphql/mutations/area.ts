import { gql } from "graphql-request";

export const CREATE_AREA_MUTATION = gql`
  mutation createArea($data: CreateAreaDto!) {
    createArea(data: $data) {
      id
    }
  }
`;
export const UPDATE_AREA_MUTATION = gql`
  mutation updateArea($id: Int!, $data: UpdateAreaDto!) {
    updateArea(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_AREA_MUTATION = gql`
  mutation deleteArea($id: Int!) {
    deleteArea(id: $id) {
      id
    }
  }
`;
