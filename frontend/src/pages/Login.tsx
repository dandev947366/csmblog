import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { setToast } from "../redux/slice/toastSlice";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from 'react';
import { setAuthLogin } from "@/redux/slice/authSlice";
import { Inputs } from "../types/Login";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const loginHandler: SubmitHandler<Inputs> = async (payload) => {
    setLoading(true);
    try {
      const auth = await login(payload);

      dispatch(setToast({ message: "Login Successfully", type: 'success' }));
      dispatch(setAuthLogin(auth));
      // console.log('User access token:',auth?.accessToken);
      // console.log('User refresh token:',auth?.refreshToken);
      auth && navigate('/dashboard');
    } catch (error) {
      dispatch(setToast({ message: "Login failed. Please try again.", type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(loginHandler)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm py-2 font-bold">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 h-8"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" }
              })}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm py-2 font-bold">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 h-8"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>
          <div className="mb-6">
            <Button
              disabled={loading}
              type="submit"
              className="text-sm w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? 'Submitting' : 'Login'}
            </Button>
          </div>
          <p className="text-center text-blue-700"><a href="/">Forgot password?</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
