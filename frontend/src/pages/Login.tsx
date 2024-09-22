import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";
import { useToast } from "../contexts/ToastContext";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { setMessage } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const loginHandler: SubmitHandler<Inputs> = async (payload) => {
    try {
      const logged = await login(payload);
      if (logged) {
        setMessage("Login Successful", 'success');
        navigate('/dashboard');
      } else {
        setMessage("Invalid email or password", 'error');
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.", 'error');
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
              type="text" 
              id="email" 
              placeholder="Enter email" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 h-8" 
              {...register("email", { required: "Email is required" })} 
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
            <button type="submit" className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-700">Submit</button>
          </div>

          <p className="text-center text-blue-700"><a href="/">Forgot password?</a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
