import { Outlet } from "react-router-dom";

export const SupplierTemplate = () => {
  return (
    <div className="relative  border bg-background rounded-xl p-4">
      <Outlet />
    </div>
  );
};
