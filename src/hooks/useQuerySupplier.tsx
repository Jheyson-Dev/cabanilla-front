import {
  createAllSuppliersQuery,
  createSupplierByIdQuery,
} from "@/graphql/queries/createSupplierQuery";
import { getSupplierByIdApi, getSuppliersApi } from "@/service/api";
import { Supplier } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAllSuppleirs = (fields: string[]) => {
  const allSuppliers = createAllSuppliersQuery(fields);
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: async (): Promise<Supplier[]> => {
      return await getSuppliersApi(allSuppliers);
    },
  });
};

export const useSupplierById = (id: number, fields: string[]) => {
  const supplierByIsQuery = createSupplierByIdQuery(id, fields);
  return useQuery({
    queryKey: ["supplier", id],
    queryFn: async (): Promise<Supplier> => {
      return await getSupplierByIdApi(supplierByIsQuery);
    },
  });
};
