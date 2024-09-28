//  IMPORT DE LOS COMPONENTES DE SHADCN
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UPDATE_ROL_MUTATION } from "@/graphql/mutations";

import { createRolByIdQuery } from "@/graphql/queries";
import { graphqlClient } from "@/graphqlClient";
import { getRolByIdApi } from "@/service/api";
import { RolInput } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search01Icon } from "hugeicons-react";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type InputForm = {
  name: string;
  status: boolean;
};

//  CAMPOS DE LA CONSULTA
const fields = ["id", "name", "status"];

export const RolEdit: FC = () => {
  const navigate = useNavigate();

  //  PARAMETROS DEL COMPONENTE
  const { id } = useParams();

  //  MUTACION PARA ACTUALIZAR LA PERSONA
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: RolInput }) => {
      try {
        return await graphqlClient.request(UPDATE_ROL_MUTATION, {
          id,
          data,
        });
      } catch (error) {
        return error;
      }
    },
  });

  const onSubmit: SubmitHandler<RolInput> = async (data: RolInput) => {
    const rolPromise = mutation.mutateAsync({ id: Number(id), data });
    toast.promise(rolPromise, {
      loading: "Loading...",
      success: () => {
        navigate("/rol");
        return "Rol updated";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  //  CREACION DE LA QUERY
  const getRolnById = createRolByIdQuery(Number(id), fields);

  // //  PETICION DE LOS DATOS DE PERSONAS
  const { data, isLoading } = useQuery({
    queryKey: ["rols", id],
    queryFn: async () => {
      return await getRolByIdApi(getRolnById);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    // formState: { errors },
  } = useForm<InputForm>();
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("status", data.status);
    }
  }, [data, setValue]);

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
        {data && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
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
            <div className="flex gap-4">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/rol");
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
      {/* {JSON.stringify(data)} */}
    </div>
  );
};
