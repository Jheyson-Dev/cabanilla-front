//  IMPORT DE LOS COMPONENTES DE SHADCN
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DELETE_AREA_MUTATION } from "@/graphql/mutations";
import { graphqlClient } from "@/graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete02Icon } from "hugeicons-react";
import { FC } from "react";
import { toast } from "sonner";

interface Props {
  id: number;
}

export const AreaDelete: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();

  //  MUTATION PARA ELIMINAR UNA CATEGORIA
  const eliminar = useMutation({
    mutationFn: async (id: number) => {
      try {
        return await graphqlClient.request(DELETE_AREA_MUTATION, {
          id,
        });
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["areas"],
        exact: true,
      });
    },
  });

  //   FUNCION PARA ELIMINAR LA CATEGORIA
  const handleDelete = async (id: number) => {
    try {
      const deletePromise = eliminar.mutateAsync(id);
      toast.promise(deletePromise, {
        loading: "Loading...",
        success: (response) => {
          console.log(response);
          return "Area Deleted";
        },
        error: (error) => {
          console.error("Error response:", error.response); // Log para verificar la respuesta de error
          return error.response.errors[0].message;
        },
        duration: 1000,
      });
    } catch (error) {
      console.error("Error during deletion:", error); // Log para capturar cualquier otro error
    }
  };
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="cursor-pointer flex items-center">
            <DialogTrigger>
              <Delete02Icon size={20} />
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Area</DialogTitle>
          <DialogDescription>
            Enter the details of the new user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"secondary"} className="hover:bg-primary">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              variant={"outline"}
              className="hover:bg-error"
              onClick={() => handleDelete(id)}
            >
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
