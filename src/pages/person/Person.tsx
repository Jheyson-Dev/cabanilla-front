import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Add01Icon,
  Download04Icon,
  Loading03Icon,
  Upload04Icon,
} from "hugeicons-react";

export const Person = () => {
  return (
    <div className="relative  border bg-background rounded-xl p-4">
      {/* {isLoading && <LoadingOverlay />} */}

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
        <h2 className="font-semibold text-xl p-4">Person Managment</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Nombre de Usuario</TableHead>
              <TableHead>Contraseña</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {data &&
              data?.getAllPersons?.map((person: any) => (
                <TableRow key={person.user.username}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.lastname}</TableCell>
                  <TableCell>{person.user.username}</TableCell>
                  <TableCell>{person.user.password}</TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </div>
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
