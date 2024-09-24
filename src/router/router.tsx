import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { Person } from "@/pages/person/Person";
import { User } from "@/pages/user/User";
import { App } from "@/templates/AppTemplate";
import AuthTemplate from "@/templates/AuthTemplate";
import { createBrowserRouter } from "react-router-dom";

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
        path: "person",
        element: (
          <ProtectedRoute>
            <Person />
          </ProtectedRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
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
]);
