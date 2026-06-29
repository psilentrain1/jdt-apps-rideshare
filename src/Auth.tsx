import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "./lib/auth-client";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const signupFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string(),
});

type loginFormValues = z.infer<typeof loginFormSchema>;
type signupFormValues = z.infer<typeof signupFormSchema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const handleLogin = async (formData: loginFormValues) => {
    const { data, error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/dashboard",
    });

    if (error && error.message) {
      toast.error(error.message);
      reset({ email: formData.email });
    }

    if (data) {
      toast.success("Logged In!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <div className="bg-slate-100 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-slate-800">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            className="min-w-48 border border-slate-800 p-2 rounded"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <input
            className="min-w-48 border border-slate-800 p-2 rounded"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <button
            className="bg-blue-500 text-slate-50 font-bold p-2 rounded active:bg-blue-700 transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
  });

  const handleSignup = async (formData: signupFormValues) => {
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      callbackURL: "/dashboard",
    });

    if (error && error.message) {
      toast.error(error.message);
    }

    if (data) {
      toast.success("Signed Up.");
      navigate("/dashboard");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <div className="bg-slate-100 rounded-xl flex flex-col items-center justify-center gap-4 p-8 text-slate-800">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            className="min-w-48 border border-slate-800 p-2 rounded"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          <input
            className="min-w-48 border border-slate-800 p-2 rounded"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <input
            className="min-w-48 border border-slate-800 p-2 rounded"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <button
            className="bg-blue-500 text-slate-50 font-bold p-2 rounded active:bg-blue-700 transition-colors duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
