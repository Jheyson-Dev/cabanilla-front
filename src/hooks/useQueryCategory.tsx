import {
  createAllCategoryQuery,
  createCategoryByIdQuery,
} from "@/graphql/queries/createCategoryQuery";
import { getCategoriesApi, getCategoryByIdApi } from "@/service/api";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllCategories = (fields: string[]) => {
  const AllCategoriesQuery = createAllCategoryQuery(fields);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      return await getCategoriesApi(AllCategoriesQuery);
    },
  });
};

export const useCategoryById = (id: number, fields: string[]) => {
  const categoryByIdQuery = createCategoryByIdQuery(id, fields);
  return useQuery({
    queryKey: ["category", id],
    queryFn: async (): Promise<Category> => {
      return await getCategoryByIdApi(categoryByIdQuery);
    },
  });
};
