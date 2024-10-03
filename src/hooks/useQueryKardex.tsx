import { createAllKardexQuery } from "@/graphql/queries";
import { getKardexApi } from "@/service/api";
import { kardex } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllKardex = (fields: string[]) => {
  const AllKardexQuery = createAllKardexQuery(fields);
  return useQuery({
    queryKey: ["kardex"],
    queryFn: async (): Promise<kardex[]> => {
      return await getKardexApi(AllKardexQuery);
    },
  });
};
