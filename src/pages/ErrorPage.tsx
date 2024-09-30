import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button variant="default">Return Home</Button>
      </Link>
    </div>
  );
};
