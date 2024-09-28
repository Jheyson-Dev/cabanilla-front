import { graphqlClient } from "@/graphqlClient";
import { Rols } from "@/types";
import { PersonAll, Persons } from "@/types/person";
import { Users } from "@/types/user";

export const getUsersApi = async (query: any): Promise<Users[]> => {
  const response: { getAllUsers: Users[] } = await graphqlClient.request(query);
  console.log(JSON.stringify(graphqlClient));
  const { getAllUsers } = response;
  return getAllUsers;
};

export const getPersonsApi = async (query: any): Promise<PersonAll> => {
  const response: { getAllPersons: PersonAll } = await graphqlClient.request(
    query
  );
  const { getAllPersons } = response;
  return getAllPersons;
};

export const getPersonByIdApi = async (query: any) => {
  const response: { getPersonById: Persons } = await graphqlClient.request(
    query
  );
  const { getPersonById } = response;
  return getPersonById;
};

export const getRolsApi = async (query: any): Promise<Rols[]> => {
  const response: { getAllRols: Rols[] } = await graphqlClient.request(query);
  const { getAllRols } = response;
  return getAllRols;
};

export const getRolByIdApi = async (query: any): Promise<Rols> => {
  const response: { getRolById: Rols } = await graphqlClient.request(query);

  const { getRolById } = response;
  return getRolById;
};
