import { LoadingOverlay } from "@/components/shared/LoadingOverlay";

import { RolManagment } from "./RolManagment";

import useALLRols from "@/hooks/useQueryRols";

//  CAMPOS PARA LA CONSULTA
const fields = ["id", "name", "status"];

export const RolList = () => {
  //  PETICION DE LOS DATOS DE ROL
  const { data, isLoading, error } = useALLRols(fields);

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {error && <div>{JSON.stringify(error)}</div>}
      <div className="py-4">{data && <RolManagment data={data} />}</div>
    </div>
  );
};
