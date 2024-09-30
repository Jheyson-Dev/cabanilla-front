import { createAllRolsQuery } from "@/graphql/queries";
import { getRolsApi } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

const useALLRols = (fields: string[]) => {
  const allRolsQuery = createAllRolsQuery(fields);
  return useQuery({
    queryKey: ["rols"],
    queryFn: async () => {
      return await getRolsApi(allRolsQuery);
    },
  });
};

export default useALLRols;
