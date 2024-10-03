import { SearchDropdown } from "@/components/shared/SearchDropdown";
import { useAllProducts } from "@/hooks/useQueryProduct";
import { useALLStores } from "@/hooks/useQueryStore";
import { InputKardex, Product } from "@/types";
import { Store } from "@/types/store";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREATE_KARDEX_MUTATION } from "@/graphql/mutations";
import { graphqlClient } from "@/graphqlClient";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const fieldsProduct = ["id", "name"];
const fieldsStore = ["id", "nombre"];

export const KardexTransfer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: products } = useAllProducts(fieldsProduct);
  const { data: stores } = useALLStores(fieldsStore);
  // Ensure products is an array and format it correctly
  const formattedProducts =
    products?.map((product: Product) => ({
      id: product.id,
      name: product.name,
    })) || [];

  const formattedStores =
    stores?.map((store: Store) => ({
      id: store.id,
      name: store.nombre,
    })) || [];

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<InputKardex>({});
  //  MUTACION PARA CREAR UNA PERSONA
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

  const onSubmit: SubmitHandler<InputKardex> = (data: InputKardex) => {
    data.quantity = parseInt(data?.quantity.toString(), 10);
    data.movementType = "TRANSFER";
    console.log(data);
    console.log(errors);
    const kardexPromise = mutation.mutateAsync(data);
    toast.promise(kardexPromise, {
      loading: "Loading...",
      success: (response) => {
        console.log(response);
        navigate("/kardex");
        return "Person created";
      },
      error: (error) => {
        console.error(error);
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto bg-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Transaction Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productId">Product</Label>
                <Controller
                  name="productId"
                  control={control}
                  rules={{ required: "Product is required" }}
                  render={({ field }) => (
                    <SearchDropdown
                      {...field}
                      items={formattedProducts}
                      onChange={(id) => field.onChange(id)}
                    />
                  )}
                />
                {errors.productId && (
                  <p className="text-error text-sm">
                    {errors.productId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="originStoreId"
                  className="font-semibold text-md"
                >
                  Origin Store
                </Label>
                <Controller
                  name="originStoreId"
                  control={control}
                  rules={{ required: "Origin Store is required" }}
                  render={({ field }) => (
                    <SearchDropdown
                      {...field}
                      items={formattedStores}
                      onChange={(id) => field.onChange(id)}
                    />
                  )}
                />
                {errors.originStoreId && (
                  <p className="text-error text-sm">
                    {errors.originStoreId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationStoreId">Destination Store</Label>
                <Controller
                  name="destinationStoreId"
                  control={control}
                  rules={{ required: "Destination Store is required" }}
                  render={({ field }) => (
                    <SearchDropdown
                      {...field}
                      items={formattedStores}
                      onChange={(id) => field.onChange(id)}
                    />
                  )}
                />
                {errors.destinationStoreId && (
                  <p className="text-error text-sm">
                    {errors.destinationStoreId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  className="bg-background"
                />
                {errors.quantity && (
                  <p className="text-error text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" type="button">
              Clear
            </Button>
            <Button className="ml-2" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
