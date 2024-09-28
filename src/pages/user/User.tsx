import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { Add01Icon, Download04Icon, Upload04Icon } from "hugeicons-react";

// LIBRERIAS EXTERNAS
import { Users } from "@/types";
import { createAllUsersQuery } from "@/graphql/queries/createUsersQuery";
import { getUsersApi } from "@/service/api";
import { UserManagment } from "./UserManagment";
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useNavigate } from "react-router-dom";

// CAMPOS PARA LAS CONSULTAS
const fields = ["users { name lastname dni email phone status}", "count"];
const allUsersQuery = createAllUsersQuery(fields);

export const User = () => {
  const navigate = useNavigate();

  //  PETICION DE LOS DATOS
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<Users[]> => {
      return await getUsersApi(allUsersQuery);
    },
    // retry: false,
  });
  console.log(data);

  if (error) navigate("/auth/login");

  return (
    <div className="relative  border bg-background rounded-xl p-4">
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}

      <div className="flex justify-between items-center p-4 rounded-lg border">
        <div className="space-x-2">
          <Button
            variant="default"
            className="bg-primary text-background flex gap-1"
          >
            <Add01Icon size={20} />
            New
          </Button>
        </div>
        <div className="space-x-2 flex gap-2">
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 flex gap-1 text-background"
          >
            <Upload04Icon size={20} />
            Import
          </Button>
          <Button
            variant="default"
            className="bg-purple-500 hover:bg-purple-600 flex gap-1 text-background"
          >
            <Download04Icon size={20} />
            Export
          </Button>
        </div>
      </div>
      <div className="py-4">{data && <UserManagment data={data ?? []} />}</div>
    </div>
  );
};
