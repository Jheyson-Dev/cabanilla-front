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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InputKardex } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphqlClient } from "@/graphqlClient";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_KARDEX_MUTATION } from "@/graphql/mutations";
import { useAllKardex } from "@/hooks/useQueryKardex";
import { KardexManagmen } from "./KardexManagment";
import { SearchDropdown } from "@/components/shared/SearchDropdown";
import { useAllProducts } from "@/hooks/useQueryProduct";
import { useNavigate } from "react-router-dom";

//  CAMPOS PARA LA CONSULTA
const fieldsKardex = [
  "id",
  "productId",
  "originStoreId",
  "destinationStoreId",
  "quantity",
  "movementType",
  "movementDate",
  "product { name }",
  "originStore { nombre }",
  "destinationStore { nombre }",
];

export const KardexList = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  //  ESTADO PARA EL DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // PETICION DE LOS DATOS DE CATEGORY
  const { data, isLoading, error } = useAllKardex(fieldsKardex);

  //  REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InputKardex>();

  // MUTACION PARA CREAR UNA CATEGORIA
  const mutation = useMutation({
    mutationFn: async (data: InputKardex) => {
      const response = await graphqlClient.request(CREATE_KARDEX_MUTATION, {
        data,
      });
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kardex"],
        exact: true,
      });
    },
  });

  const onSubmit: SubmitHandler<InputKardex> = async (data: InputKardex) => {
    console.log(data);
    // const Promise = mutation.mutateAsync(data);
    // setIsDialogOpen(false);
    // toast.promise(Promise, {
    //   loading: "Loading...",
    //   success: (response) => {
    //     console.log(response);
    //     return "Movement created";
    //   },
    //   error: (error) => {
    //     return error.response.errors[0].message;
    //   },
    //   duration: 1000,
    // });
  };

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}
      <div className="flex justify-between items-center p-4 rounded-lg border">
        <div className="space-x-2 flex">
          <Button
            onClick={() => navigate("/kardex/create")}
            variant="default"
            className="bg-primary text-background flex gap-1"
          >
            <Add01Icon size={20} />
            Create
          </Button>
          <Button
            onClick={() => navigate("/kardex/transfer")}
            variant="default"
            className="bg-primary text-background flex gap-1"
          >
            <Add01Icon size={20} />
            Trasfering
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
      <div className="py-4">{data && <KardexManagmen data={data ?? []} />}</div>
    </div>
  );
};
