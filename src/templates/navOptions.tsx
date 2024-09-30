// src/navOptions.ts
import { ReactNode } from "react";
import { DashboardSpeed01Icon, DashboardSquare01Icon } from "hugeicons-react";

interface NavOption {
  path: string;
  name: string;
  icon: ReactNode;
  allowedRoles: string[];
}

export const navOptions: NavOption[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: <DashboardSpeed01Icon size={20} />,
    allowedRoles: ["Admin", "EncargadoAlmacen"],
  },
  {
    path: "/user",
    name: "User",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin"],
  },
  {
    path: "/rol",
    name: "Rol",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin"],
  },
  {
    path: "/category-product",
    name: "Category Product",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin", "EncargadoAlmacen"],
  },
  {
    path: "/supplier",
    name: "Supplier",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin", "EncargadoAlmacen"],
  },
  {
    path: "/product",
    name: "Product",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin", "EncargadoAlmacen"],
  },
  {
    path: "/area",
    name: "Area",
    icon: <DashboardSquare01Icon size={20} />,
    allowedRoles: ["Admin", "EncargadoAlmacen"],
  },
];
