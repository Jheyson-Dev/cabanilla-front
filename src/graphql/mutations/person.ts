import { gql } from "graphql-request";

export const CREATE_PERSON_AND_USER_MUTATION = gql`
  mutation createPersonAndUser($id: Int!, $data: CreatePersonDto!) {
    createPersonAndUser(id: $id, data: $data) {
      name
      lastname
      dni
      email
      phone
    }
  }
`;

export const DELETE_PERSON_AND_USER_MUTATION = gql`
  mutation deletePersonAndUser($id: Int!) {
    deletePersonAndUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_PERSON_AND_USER_MUTATION = gql`
  mutation updatePersonAndUser(
    $id: Int!
    $id_table_rol: Int!
    $id_rol: Int!
    $data: UpdatePersonDto!
  ) {
    updatePersonAndUser(
      id: $id
      id_table_rol: $id_table_rol
      id_rol: $id_rol
      data: $data
    ) {
      id
    }
  }
`;
