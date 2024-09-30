import {
  createAllProductsQuery,
  createProductByIdQuery,
} from "@/graphql/queries";
import { getProductByIdApi, getProductsApi } from "@/service/api";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllProducts = (fields: string[]) => {
  const AllProductsQuery = createAllProductsQuery(fields);
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      return await getProductsApi(AllProductsQuery);
    },
  });
};

export const useProductById = (id: number, fields: string[]) => {
  const productByIdQuery = createProductByIdQuery(id, fields);
  return useQuery({
    queryKey: ["category", id],
    queryFn: async (): Promise<Product> => {
      return await getProductByIdApi(productByIdQuery);
    },
  });
};
