import { gql } from "graphql-request";

export const createAllPersonsQuery = (fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
        query {
        getAllPersons {
            ${fieldsString}
        }
        }
    `;
};

export const createPersonByIdQuery = (id: number, fields: string[]) => {
  const fieldsString = fields.join("\n");
  return gql`
    query {
      getPersonById(id: ${id}) {
        ${fieldsString}
      }
    }
  `;
};
