import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { PersonTemplate } from "@/pages/person/PersonTemplate";
import { PersonEdit } from "@/pages/person/PersonEdit";
import { User } from "@/pages/user/User";
import { App } from "@/templates/AppTemplate";
import AuthTemplate from "@/templates/AuthTemplate";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Personlist } from "@/pages/person/Personlist";
import { ErrorPage } from "@/pages/ErrorPage";
import { RolTemplate } from "@/pages/rol/RolTemplate";
import { RolList } from "@/pages/rol/RolList";
import { RolEdit } from "@/pages/rol/RolEdit";

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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
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
          <ProtectedRoute>
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
    path: "*",
    element: <Navigate to="/error" />,
  },
]);
