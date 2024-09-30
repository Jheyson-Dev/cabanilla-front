import { LoadingOverlay } from "@/components/shared/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { UPDATE_CATEGORY_MUTATION } from "@/graphql/mutations/category";
import { graphqlClient } from "@/graphqlClient";
import { useCategoryById } from "@/hooks/useQueryCategory";
import { useMutation } from "@tanstack/react-query";
import { Search01Icon } from "hugeicons-react";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

type InputForm = {
  name: string;
  description: string;
  status: boolean;
};

const fields = ["id", "name", "description", "status"];

export const CategoryProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //  MUTACION PARA ACTUALIZAR LA CATEGORIA
  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: InputForm }) => {
      try {
        return await graphqlClient.request(UPDATE_CATEGORY_MUTATION, {
          id,
          data,
        });
      } catch (error) {
        return error;
      }
    },
  });

  const onSubmit: SubmitHandler<InputForm> = async (data: InputForm) => {
    console.log(data);
    const rolPromise = mutation.mutateAsync({ id: Number(id), data });
    toast.promise(rolPromise, {
      loading: "Loading...",
      success: () => {
        navigate("/category-product");
        return "Category updated";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  //   PETICION DE LOS DATOS DE LA CATEGORIA
  const { data: categories, isLoading } = useCategoryById(Number(id), fields);

  const { register, handleSubmit, setValue, control } = useForm<InputForm>();

  useEffect(() => {
    if (categories) {
      setValue("name", categories.name);
      setValue("description", categories.description);
      setValue("status", categories.status);
    }
  }, [categories, setValue]);

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      <div className="font-semibold text-xl p-4 flex justify-between">
        Category Product Edit
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
        {categories && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
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
    </div>
  );
};
