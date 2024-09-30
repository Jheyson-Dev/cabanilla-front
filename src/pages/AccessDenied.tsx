import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "hugeicons-react";
import { useNavigate } from "react-router-dom";

export const AccessDenied = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleReturn = () => {
    navigate("/"); // This navigates back to the previous page
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6 p-8 bg-card rounded-lg shadow-lg">
        <AlertCircleIcon className="w-16 h-16 text-destructive mx-auto" />
        <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground max-w-md">
          Sorry, you don't have permission to access this page. Please log in or
          contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleReturn} variant="outline" className="w-full">
            Return Home
          </Button>
          <Button onClick={handleLogin} className="w-full">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
};
