import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { graphqlClient } from "@/graphqlClient";
import { LOGIN_MUTATION } from "@/graphql/mutations";
import { LoginInput } from "@/types";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await graphqlClient.request(LOGIN_MUTATION, { data });
      return response;
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    const loginPromise = mutation.mutateAsync(data);

    toast.promise(loginPromise, {
      loading: "Loading...",
      success: (response) => {
        const { accessToken: token, refreshToken } = (
          response as { login: { accessToken: string; refreshToken: string } }
        ).login;
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/");
        return "Login successful";
      },
      error: (error) => {
        return error.response.errors[0].message;
      },
      duration: 1000,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username", { required: "Username is required" })}
                id="username"
              />
              {errors.username && (
                <p className="text-error text-sm">{errors.username.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
                id="password"
              />
              {errors.password && (
                <p className="text-error text-sm">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="btn-class"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
