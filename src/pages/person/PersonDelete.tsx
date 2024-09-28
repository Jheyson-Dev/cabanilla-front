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
import { DELETE_PERSON_AND_USER_MUTATION } from "@/graphql/mutations/person";
import { graphqlClient } from "@/graphqlClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Delete02Icon } from "hugeicons-react";
import { FC } from "react";
import { toast } from "sonner";

interface PersonDeleteProps {
  id: number;
}

export const PersonDelete: FC<PersonDeleteProps> = ({ id }) => {
  const queryClient = useQueryClient();
  //  MUTATION PARA ELIMINAR UNA PERSONA
  const eliminar = useMutation({
    mutationFn: async (id: number) => {
      try {
        return await graphqlClient.request(DELETE_PERSON_AND_USER_MUTATION, {
          id,
        });
      } catch (error) {
        return error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
    },
  });

  //   FUNCION PARA ELIMINAR LA PERSONA
  const handleDelete = async (id: number) => {
    const deletePromise = eliminar.mutateAsync(id);
    toast.promise(deletePromise, {
      loading: "Loading...",
      success: (respone) => {
        console.log(respone);
        return "Person Deleted";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
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
          <DialogTitle>Delete Person</DialogTitle>
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
