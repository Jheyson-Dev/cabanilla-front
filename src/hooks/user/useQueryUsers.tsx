import {
  createAllPersonsQuery,
  createPersonByIdQuery,
} from "@/graphql/queries";
import { getPersonByIdApi, getPersonsApi } from "@/service/api";
import { PersonAll } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllUsers = (fields: string[]) => {
  const allPersonsQuery = createAllPersonsQuery(fields);
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<PersonAll> => {
      return await getPersonsApi(allPersonsQuery);
    },
  });
};

export const useByIdUser = (id: number, fields: string[]) => {
  const personByIdQuery = createPersonByIdQuery(id, fields);
  return useQuery({
    queryKey: ["users", id],
    queryFn: async (): Promise<any> => {
      return await getPersonByIdApi(personByIdQuery);
    },
  });
};
