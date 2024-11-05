import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { replace, useNavigate } from "react-router-dom";
import { getUser } from "../funcs/funcs";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../features/users/usersSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (data) => getUser(data),
    onSuccess: (data) => {
      if (data.user) {
        toast.success("Loged in successfuly.");
        dispatch(login(data.user));
        setTimeout(() => {
          navigate('/', replace)
        }, 1000);
      } else {
        toast.error("Invalid username or password.");
      }
    },
    onError: (err) => {
      toast.error("Login Failed");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="border w-[450px] rounded-2xl flex flex-col gap-4 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center font-medium text-2xl">Blog Login</h1>

        <div className="flex flex-col gap-4 mt-10">
          <label htmlFor="username">Username: </label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full bg-slate-100 p-2 rounded-md"
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="password">Password: </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="w-full bg-slate-100 p-2 rounded-md"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          className="mt-8 bg-teal-500 text-white py-3 text-xl transition-colors hover:bg-teal-600 rounded-md"
          type="submit"
        >
          Login
        </button>

        <p
          className="text-center text-sm text-slate-500 cursor-pointer"
          onClick={() => {
            navigate("/register", { replace: true });
          }}
        >
          Sign Up
        </p>
      </form>
    </div>
  );
}

export default Login;
