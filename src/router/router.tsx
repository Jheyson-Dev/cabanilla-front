import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { PersonTemplate } from "@/pages/person/PersonTemplate";
import { PersonEdit } from "@/pages/person/PersonEdit";
import { App } from "@/templates/AppTemplate";
import AuthTemplate from "@/templates/AuthTemplate";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Personlist } from "@/pages/person/Personlist";
import { ErrorPage } from "@/pages/ErrorPage";
import { RolTemplate } from "@/pages/rol/RolTemplate";
import { RolList } from "@/pages/rol/RolList";
import { RolEdit } from "@/pages/rol/RolEdit";
import { AccessDenied } from "@/pages/AccessDenied";
import { ProductTemplate } from "@/pages/product/ProductTemplate";
import { CategoryProductTemplate } from "@/pages/categoryProduct/CategoryProductTemplate";
import { CategoryProductList } from "@/pages/categoryProduct/CategoryProductList";
import { CategoryProductEdit } from "@/pages/categoryProduct/CategoryProductEdit";
import { SupplierTemplate } from "@/pages/supplier/SupplierTemplate";
import { SupplierList } from "@/pages/supplier/SupplierList";
import { SupplierEdit } from "@/pages/supplier/SupplierEdit";
import { ProductList } from "@/pages/product/ProductList";
import { ProductEdit } from "@/pages/product/ProductEdit";
import { AreaTemplate } from "@/pages/area/areaTemplate";
import { AreaList } from "@/pages/area/AreaList";
import { AreaEdit } from "@/pages/area/AreaEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <PersonTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Personlist />,
          },
          {
            path: "edit/:id",
            element: <PersonEdit />,
          },
        ],
      },
      // {
      //   path: "user",
      //   element: (
      //     <ProtectedRoute>
      //       <User />
      //     </ProtectedRoute>
      //   ),
      // },

      {
        path: "rol",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <RolTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <RolList />,
          },
          {
            path: "edit/:id",
            element: <RolEdit />,
          },
        ],
      },
      {
        path: "product",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
            <ProductTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
                <ProductList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: <ProductEdit />,
          },
        ],
      },
      {
        path: "category-product",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
            <CategoryProductTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
                <CategoryProductList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: <CategoryProductEdit />,
          },
        ],
      },
      {
        path: "supplier",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
            <SupplierTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
                <SupplierList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: <SupplierEdit />,
          },
        ],
      },
      {
        path: "area",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
            <AreaTemplate />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["Admin", "EncargadoAlmacen"]}>
                <AreaList />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: <AreaEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthTemplate />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
]);
