import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AuthTemplate: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Outlet />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
            success: "bg-green-400 text-white",
            warning: "text-yellow-400",
            info: "bg-blue-400",
            loading: "bg-blue-400 text-white",
          },
        }}
      />
    </div>
  );
};

export default AuthTemplate;
