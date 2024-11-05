import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { postUser } from "../funcs/funcs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newUser) => postUser(newUser),
    onSuccess: () => {
      toast.success("New user created, you can login now.");
    },
    onError: (err) => {
      toast.error("Creating new user failed, try again.");
      console.log(err);
    },
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border w-[450px] rounded-2xl flex flex-col gap-4 p-8"
      >
        <h1 className="text-center font-medium text-2xl">Blog Register</h1>

        <div className="flex flex-col gap-4 mt-10">
          <label htmlFor="email">Email:</label>
          <input
            className={`w-full bg-slate-100 p-2 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="username">Username:</label>
          <input
            className={`w-full bg-slate-100 p-2 rounded-md ${
              errors.username ? "border-red-500" : ""
            }`}
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="password">Password:</label>
          <input
            className={`w-full bg-slate-100 p-2 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={`mt-8 bg-teal-500 text-white py-3 text-xl transition-colors hover:bg-teal-600 rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering" : "Register"}
        </button>

        <p onClick={() => {
          navigate('/login')
        }} className="text-center text-sm text-slate-500 cursor-pointer">
          Login
        </p>
      </form>
    </div>
  );
}

export default Login;
