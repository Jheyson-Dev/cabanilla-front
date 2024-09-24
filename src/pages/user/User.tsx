import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

import {
  Add01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Download04Icon,
  Loading03Icon,
  Search01Icon,
  Upload04Icon,
} from "hugeicons-react";

// LIBRERIAS EXTERNAS
import moment from "moment";
import { Users } from "@/types/user";
import { createAllUsersQuery } from "@/graphql/queries/createUsersQuery";
import { getUsersApi } from "@/service/api";

// Ejemplo de uso
const fields = ["id", "username", "status", "createdAt", "updatedAt"];
const allUsersQuery = createAllUsersQuery(fields);

export const User = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUsersApi(allUsersQuery);
    },
  });
  console.log(data);
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
          {/* <Button
            variant="default"
            className="bg-destructive hover:bg-destructive-foreground flex gap-1"
          >
            <Delete02Icon size={20} />
            Delete
          </Button> */}
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
      <div className="py-4">
        <div className="font-semibold text-xl p-4 flex justify-between">
          User Managment
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="search" placeholder="Buscar..." className="pl-10" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data?.map((user: Users) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <StatusIndicator status={user.status} />
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {moment(user.updatedAt).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div></div>
    </div>
  );
};

interface StatusIndicatorProps {
  status: boolean | undefined;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className="flex items-center">
      {status ? (
        <CheckmarkCircle01Icon className="text-green-500 w-5 h-5" />
      ) : (
        <Cancel01Icon className="text-red-500 w-5 h-5" />
      )}
      <span className="ml-2">{status ? "Active" : "Inactive"}</span>
    </div>
  );
};

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <Loading03Icon className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-2 text-lg font-semibold">Cargando dashboard...</p>
      </div>
    </div>
  );
}
