import { createAllAreaQuery, createAreaByIdQuery } from "@/graphql/queries";
import { getAreaByIdApi, getAreasApi } from "@/service/api";
import { Area } from "@/types/area";
import { useQuery } from "@tanstack/react-query";

export const useAllAreas = (fields: string[]) => {
  const AllAreasQuery = createAllAreaQuery(fields);
  return useQuery({
    queryKey: ["areas"],
    queryFn: async (): Promise<Area[]> => {
      return await getAreasApi(AllAreasQuery);
    },
  });
};

export const useAreaById = (id: number, fields: string[]) => {
  const areaByIdQuery = createAreaByIdQuery(id, fields);
  return useQuery({
    queryKey: ["area", id],
    queryFn: async (): Promise<Area> => {
      return await getAreaByIdApi(areaByIdQuery);
    },
  });
};
