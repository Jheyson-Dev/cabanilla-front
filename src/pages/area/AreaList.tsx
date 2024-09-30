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
import { InputArea } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { graphqlClient } from "@/graphqlClient";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAllAreas } from "@/hooks/useQueryArea";
import { CREATE_AREA_MUTATION } from "@/graphql/mutations";
import { AreaManagment } from "./AreaManagment";
import { Console } from "console";

//  CAMPOS PARA LA CONSULTA
const fieldsAreas = [
  "id",
  "name",
  "responsableId",
  "status",
  "createdAt",
  "updatedAt",
];

export const AreaList = () => {
  const queryClient = useQueryClient();

  //  ESTADO PARA EL DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // PETICION DE LOS DATOS DE CATEGORY
  const { data, isLoading, error } = useAllAreas(fieldsAreas);

  //  REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InputArea>();

  // MUTACION PARA CREAR UNA CATEGORIA
  const mutation = useMutation({
    mutationFn: async (data: InputArea) => {
      const response = await graphqlClient.request(CREATE_AREA_MUTATION, {
        data,
      });
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["areas"],
        exact: true,
      });
    },
  });

  const onSubmit: SubmitHandler<InputArea> = async (data: InputArea) => {
    console.log(data);
    const Promise = mutation.mutateAsync(data);
    setIsDialogOpen(false);
    toast.promise(Promise, {
      loading: "Loading...",
      success: (response) => {
        console.log(response);
        return "Area created";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="name" className="text-left">
                      Name :
                    </Label>
                    <Input
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Min length is 3" },
                        maxLength: { value: 20, message: "Max length is 20" },
                      })}
                      // value="Pedro Duarte"
                      className={`col-span-3 ${
                        errors.name
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.name && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  {/* <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="description" className="text-left">
                      Description :
                    </Label>
                    <Input
                      id="description"
                      {...register("description", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Min length is 3" },
                        maxLength: { value: 20, message: "Max length is 20" },
                      })}
                      // value="Pedro Duarte"
                      className={`col-span-3 ${
                        errors.name
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.name && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.name.message}
                      </p>
                    )}
                  </div> */}
                  <Button
                    type="submit"
                    className="mt-4"
                    variant={"default"}
                    // disabled={mutation.isPending}
                  >
                    {/* {mutation.isPending ? "Signing In..." : "Sign In"} */}
                    Create
                  </Button>
                </form>
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
      <div className="py-4">{data && <AreaManagment data={data ?? []} />}</div>
    </div>
  );
};
