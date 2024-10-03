import { FC } from "react";
import { Badge } from "../ui/badge";

interface PropsMovements {
  type: "IN" | "OUT" | "TRANSFER";
}

export const Movements: FC<PropsMovements> = ({ type }) => {
  let movementLabel;
  let className;

  switch (type) {
    case "IN":
      movementLabel = "Entrada";
      className =
        "bg-green-500 bg-opacity-10 text-green-500 border border-green-500 text-sm font-semibold";
      break;
    case "OUT":
      movementLabel = "Salida";
      className =
        "bg-red-500 bg-opacity-10 text-red-500 border border-red-500 text-sm font-semibold";
      break;
    case "TRANSFER":
      movementLabel = "Transferencia";
      className =
        "bg-blue-500 bg-opacity-10 text-blue-500 border border-blue-500 text-sm font-semibold";
      break;
  }

  return (
    <Badge variant={"outline"} className={className}>
      {movementLabel}
    </Badge>
  );
};
