import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { useAllSuppleirs } from "@/hooks/useQuerySupplier";
import { SupplierManagment } from "./SupplierManagment";
//  IMPORT DE LOS COMPONENTES DE SHADCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Add01Icon, Download04Icon, Upload04Icon } from "hugeicons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInput } from "@/types";
import { useState } from "react";
import { graphqlClient } from "@/graphqlClient";
import { CREATE_SUPPLIER_MUTATION } from "@/graphql/mutations";
import { toast } from "sonner";

const fields = [
  "id",
  "name,",
  "address",
  "city",
  "country",
  "phone",
  "email",
  "status",
];

export const SupplierList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useAllSuppleirs(fields);
  console.log(data);

  //  ESTADO PARA EL DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //  REACT HOOK FORMS
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplierInput>();

  //  MUTACION PARA CREAR UNA PERSONA
  const mutation = useMutation({
    mutationFn: async (data: SupplierInput) => {
      const response = await graphqlClient.request(CREATE_SUPPLIER_MUTATION, {
        data,
      });
      reset();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<SupplierInput> = async (
    data: SupplierInput
  ) => {
    // Filtrar las propiedades que son cadenas vacías
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );
    const personPromise = mutation.mutateAsync(filteredData as SupplierInput);
    setIsDialogOpen(false);
    toast.promise(personPromise, {
      loading: "Loading...",
      success: (response) => {
        console.log(response);
        return "Supplier created";
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
                    <Label htmlFor="address" className="text-left">
                      Address :
                    </Label>
                    <Input
                      id="address"
                      {...register("address")}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.address
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.address && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="country" className="text-left">
                      Country :
                    </Label>
                    <Input
                      id="country"
                      {...register("country")}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.country
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.address && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="city" className="text-left">
                      City :
                    </Label>
                    <Input
                      id="address"
                      {...register("city")}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.city
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.address && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="phone" className="text-left">
                      Phone :
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.phone
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.address && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-x-4">
                    <Label htmlFor="email" className="text-left">
                      Email :
                    </Label>
                    <Input
                      id="email"
                      {...register("email")}
                      // value="@peduarte"
                      className={`col-span-3 ${
                        errors.email
                          ? "border-error focus-visible:ring-error"
                          : ""
                      }
                      }`}
                    />
                    {errors.address && (
                      <p className="text-error text-sm font-semibold col-start-2 col-span-3">
                        {errors.address.message}
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
      <div>{data && <SupplierManagment data={data ?? []} />}</div>
    </div>
  );
};
