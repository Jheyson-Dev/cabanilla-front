//  IMPORT DE LOS COMPONENTES DE SHADCN
import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UPDATE_SUPPLIER_MUTATION } from "@/graphql/mutations";

import { createRolByIdQuery } from "@/graphql/queries";
import { createSupplierByIdQuery } from "@/graphql/queries/createSupplierQuery";
import { graphqlClient } from "@/graphqlClient";
import { useSupplierById } from "@/hooks/useQuerySupplier";
import { getRolByIdApi } from "@/service/api";
import { RolInput, SupplierInput } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search01Icon } from "hugeicons-react";
import { FC, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type InputForm = {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  status: boolean;
};

//  CAMPOS DE LA CONSULTA
const fields = [
  "id",
  "name",
  "address",
  "city",
  "country",
  "phone",
  "email",
  "status",
];

export const SupplierEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //  MUTACION PARA ACTUALIZAR LA PERSONA
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: SupplierInput }) => {
      try {
        return await graphqlClient.request(UPDATE_SUPPLIER_MUTATION, {
          id,
          data,
        });
      } catch (error) {
        return error;
      }
    },
    onSuccess: (response) => {
      console.log(response);
    },
  });

  const onSubmit: SubmitHandler<SupplierInput> = async (
    data: SupplierInput
  ) => {
    console.log(data);
    const rolPromise = mutation.mutateAsync({ id: Number(id), data });
    toast.promise(rolPromise, {
      loading: "Loading...",
      success: () => {
        navigate("/supplier");
        return "Supplier updated";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  //  PETICION DE LOS DATOS DEL SUPPLIER
  const { data, isLoading, error } = useSupplierById(Number(id), fields);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InputForm>();
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("address", data.address);
      setValue("city", data.city);
      setValue("country", data.country);
      setValue("phone", data.phone);
      setValue("email", data.email);
      setValue("status", data.status);
    }
  }, [data, setValue]);

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}
      <div className="font-semibold text-xl p-4 flex justify-between">
        Supplier Edit
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
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone", {
                  maxLength: { value: 10, message: "Max length is 10" },
                })}
                className={`col-span-3 ${
                  errors.phone ? "border-error focus-visible:ring-error" : ""
                }
                      }`}
              />
              {errors.phone && (
                <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...register("email")} />
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
            <div className="flex gap-4 col-span-2">
              <Button
                className="bg-error text-foreground"
                variant={"destructive"}
                onClick={() => {
                  navigate("/supplier");
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
