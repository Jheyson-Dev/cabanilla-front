import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Add01Icon, Download04Icon, Upload04Icon } from "hugeicons-react";

//  IMPORT DE LOS COMPONENTES DE SHADCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAllProducts } from "@/hooks/useQueryProduct";
import { ProductManagment } from "./ProductManagment";

//  CAMPOS PARA LA CONSULTA
const fieldsCategories = [
  "id",
  "name",
  "description",
  "price",
  "quantityAvailable",
  "categoryId",
  "supplierId",
  " category { name description }",
  "status",
];

export const ProductList = () => {
  //  ESTADO PARA EL DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //  PETICION DE LOS DATOS DE CATEGORY
  const { data, isLoading, error } = useAllProducts(fieldsCategories);
  console.log(data);

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}
      <div className="flex justify-between items-center p-4 rounded-lg border">
        <div className="space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button
                variant="default"
                className="bg-primary text-background flex gap-1"
              >
                <Add01Icon size={20} />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Rol</DialogTitle>
                <DialogDescription>
                  Enter the details of the new user here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
      {/* <div className="py-4">{data && <div>{JSON.stringify(data)}</div>}</div> */}
      <div className="py-4">
        {data && <ProductManagment data={data ?? []} />}
      </div>
    </div>
  );
};
