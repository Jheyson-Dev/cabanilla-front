import { graphqlClient } from "@/graphqlClient";
import { Users } from "@/types/user";

export const getUsersApi = async (query: any): Promise<Users[]> => {
  const response: { getAllUsers: Users[] } = await graphqlClient.request(query);
  const { getAllUsers } = response;
  return getAllUsers;
};
