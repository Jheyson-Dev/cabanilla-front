//  IMPORT DE LOS COMPONENTES DE SHADCN
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UPDATE_PERSON_AND_USER_MUTATION } from "@/graphql/mutations";

import { createPersonByIdQuery } from "@/graphql/queries";
import { graphqlClient } from "@/graphqlClient";
import { getPersonByIdApi } from "@/service/api";
import { PersonInput } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search01Icon } from "hugeicons-react";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useALLRols from "@/hooks/rol/useQueryRols";
import { useByIdUser } from "@/hooks/user/useQueryUsers";

//  CAMPOS PARA LAS CONSULTA DE PERSONAS
const fieldsUser: string[] = [
  "id name lastname dni email phone status  user { roles { id rol { id name } } }",
];
//  CAMPOS DE LA CONSULTA DE ROLES
const fieldsRol: string[] = ["id", "name"];

type InputForm = {
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  status: boolean;
  id_rol: number;
};

export const PersonEdit: FC = () => {
  const navigate = useNavigate();

  //  PARAMETROS DEL COMPONENTE
  const { id } = useParams();

  //  PETICION DE LOS DATOS DE LA PERSONA
  // const {}=

  //  MUTACION PARA ACTUALIZAR LA PERSONA
  const mutation = useMutation({
    mutationFn: async ({
      id,
      id_table_rol,
      id_rol,
      data,
    }: {
      id: number;
      id_table_rol: number;
      id_rol: number;
      data: PersonInput;
    }) => {
      try {
        return await graphqlClient.request(UPDATE_PERSON_AND_USER_MUTATION, {
          id,
          id_table_rol,
          id_rol,
          data,
        });
      } catch (error) {
        return error;
      }
    },
  });

  const onSubmit: SubmitHandler<PersonInput> = async (data: PersonInput) => {
    const id = persons.id;
    const id_table_rol = persons.user.roles[0].id;
    const id_rol = data.id_rol;
    delete data.id_rol;
    const personPromise = mutation.mutateAsync({
      id: Number(id),
      id_table_rol: Number(id_table_rol),
      id_rol: Number(id_rol),
      data,
    });
    toast.promise(personPromise, {
      loading: "Loading...",
      success: () => {
        navigate("/user");
        return "User updated";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  //  CREACION DE LA QUERY
  const { data: persons } = useByIdUser(Number(id), fieldsUser);

  // PETICION DE LOS DATOS DE ROLES

  const { data: roles, isLoading } = useALLRols(fieldsRol);
  // console.log(data);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InputForm>();

  useEffect(() => {
    if (persons) {
      setValue("name", persons.name);
      setValue("lastname", persons.lastname);
      setValue("dni", persons.dni);
      setValue("email", persons.email);
      setValue("phone", persons.phone);
      setValue("status", persons.status);
      setValue("id_rol", persons?.user?.roles[0]?.rol?.id ?? 0);
    }
  }, [persons, setValue]);

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div className="font-semibold text-xl p-4 flex justify-between">
        Person Edit
        <div className="flex gap-4">
          <div className="relative w-full max-w-sm">
            <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              // value={filtering}
              // onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {persons && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">LastName</Label>
              <Input id="lastname" {...register("lastname")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dni">Dni</Label>
              <Input id="dni" {...register("dni")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="status" className=" flex my-2">
                Status
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-2 items-center">
                    <Switch
                      id="status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span>{field.value === true ? "Active" : "Inactive"}</span>
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
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
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione el rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles &&
                          roles.map((role) => (
                            <SelectItem key={role.id} value={`${role.id}`}>
                              {role.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
              {errors.id_rol && (
                <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                  {errors.id_rol.message}
                </p>
              )}
            </div>
            <div className="flex gap-4 col-span-2">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/user");
                }}
              >
                Cancel
              </Button>
              <Button className=" text-foreground" type="submit">
                Update
              </Button>
            </div>
          </form>
        )}
      </div>
      {/* {data && <span>{JSON.stringify(data)}</span>} */}
    </div>
  );
};
