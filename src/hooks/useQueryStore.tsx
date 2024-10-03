import { createAllStoreQuery, createStoreByIdQuery } from "@/graphql/queries";
import { getStoreByIdApi, getStoresApi } from "@/service/api";
import { Store } from "@/types/store";
import { useQuery } from "@tanstack/react-query";

export const useALLStores = (fields: string[]) => {
  const allStoreQuery = createAllStoreQuery(fields);
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      return await getStoresApi(allStoreQuery);
    },
  });
};

export const useStoreById = (id: number, fields: string[]) => {
  const storeByIsQuery = createStoreByIdQuery(id, fields);
  return useQuery({
    queryKey: ["store", id],
    queryFn: async (): Promise<Store> => {
      return await getStoreByIdApi(storeByIsQuery);
    },
  });
};
