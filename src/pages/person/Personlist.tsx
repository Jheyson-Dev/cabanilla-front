import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";

import { PersonInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Add01Icon, Download04Icon, Upload04Icon } from "hugeicons-react";
import { PersonManagment } from "./PersonManagment";

//  IMPORT DE LOS COMPONENTES DE SHADCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { graphqlClient } from "@/graphqlClient";
import { toast } from "sonner";
import { CREATE_PERSON_AND_USER_MUTATION } from "@/graphql/mutations/person";
import { useState } from "react";
import { useAllUsers } from "@/hooks/user/useQueryUsers";
import useALLRols from "@/hooks/rol/useQueryRols";

//  CAMPOS PARA LAS CONSULTAS
const fields: string[] = [
  "users { id name lastname dni email phone status  user { username status roles { rol { name } } } }",
  "count",
];

const fieldsRol: string[] = ["id", "name"];

export const Personlist = () => {
  const queryClient = useQueryClient();

  //  ESTADO PARA EL DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // // PETICION DE LOS DATOS DE LAS PERSONAS
  const { data, isLoading, error } = useAllUsers(fields);

  //  PETICION DE LOS DATOS DE LOS ROLES
  const { data: roles } = useALLRols(fieldsRol);

  //  REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PersonInput>();

  //  MUTACION PARA CREAR UNA PERSONA
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PersonInput }) => {
      const response = await graphqlClient.request(
        CREATE_PERSON_AND_USER_MUTATION,
        {
          id,
          data,
        }
      );
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
    },
  });

  const onSubmit: SubmitHandler<PersonInput> = async (data: PersonInput) => {
    const id = data.id_rol; // Obtener el id_rol del formulario
    delete data.id_rol; // Eliminar el atributo id_rol de data
    console.log(id);
    console.log(data);

    if (id !== undefined) {
      const personPromise = mutation.mutateAsync({ id, data });
      setIsDialogOpen(false);
      toast.promise(personPromise, {
        loading: "Loading...",
        success: (response) => {
          console.log(response);
          return "Person created";
        },
        error: (error) => {
          return error.response.errors[0].message;
        },
        duration: 1000,
      });
    } else {
      toast.error("Role ID is required");
    }
  };

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
                <DialogTitle>Create Person</DialogTitle>
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
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="lastname" className="text-left">
                      Lastname :
                    </Label>
                    <Input
                      id="lastname"
                      {...register("lastname", {
                        required: "Lastname is required",
                        minLength: { value: 3, message: "Min length is 3" },
                        maxLength: { value: 20, message: "Max length is 20" },
                      })}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.lastname
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.lastname && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="dni" className="text-left">
                      Dni :
                    </Label>
                    <Input
                      id="dni"
                      {...register("dni", {
                        required: "Dni is required",
                        minLength: { value: 8, message: "Min length is 8" },
                        maxLength: { value: 8, message: "Max length is 8" },
                      })}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.dni
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.dni && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.dni.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4 space-y-2">
                    <Label htmlFor="email" className="text-left">
                      Email :
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format",
                        },
                      })}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.email
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.email && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="phone" className="text-left">
                      Phone :
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone", {
                        required: "Phone is required",
                        minLength: { value: 9, message: "Min length is 9" },
                        maxLength: { value: 11, message: "Max length is 11" },
                      })}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.phone
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="id_rol" className="text-left">
                      Rol :
                    </Label>
                    <Controller
                      name="id_rol"
                      control={control}
                      render={({ field }) => (
                        <div
                          className={`col-span-3 ${
                            errors.id_rol
                              ? "border-error focus-visible:ring-error"
                              : ""
                          }
                      }`}
                        >
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Seleccione el rol" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles &&
                                roles.map((role) => (
                                  <SelectItem
                                    key={role.id}
                                    value={`${role.id}`}
                                  >
                                    {role.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    {/* <Input
                      id="id_rol"
                      {...register("id_rol", {
                        required: "Phone is required",
                        minLength: { value: 9, message: "Min length is 9" },
                        maxLength: { value: 11, message: "Max length is 11" },
                      })}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.id_rol
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    /> */}
                    {errors.id_rol && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.id_rol.message}
                      </p>
                    )}
                  </div>
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
      <div className="py-4">
        {data && (
          <PersonManagment data={data.users ?? []} count={data.count ?? 0} />
        )}
      </div>
    </div>
  );
};
