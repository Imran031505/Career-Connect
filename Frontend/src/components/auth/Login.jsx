import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Added state for showPassword
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setTimeout(() => navigate("/"), 1000);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(setLoading(false)); // Reset loading state when component mounts
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
   
    <div className="h-screen flex flex-col">
    <Navbar/>
    <div className="flex-grow  bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
   
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
     
      </div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-2/3 lg:w-[44%] backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 my-10 transition-all duration-300 hover:shadow-2xl dark:shadow-blue-900/20"
        >
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-2xl font-bold mb-2 text-blue-900 dark:text-white animate-slideDown">
              Job<span className="text-blue-600 dark:text-blue-400">Portal</span>
            </h1>
          </div>
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-900 dark:text-white animate-slideDown">
            Welcome Back
          </h1>
          <div className="space-y-6">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>

            <div className="relative mt-4">
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-blue-600"
                  />
                  <label className="cursor-pointer text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                    Student
                  </label>
                </div>
                <div className="flex items-center space-x-2 group cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-blue-600"
                  />
                  <label className="cursor-pointer text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">
                    Recruiter
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={input.rememberMe}
                    onChange={changeEventHandler}
                    className="mr-2 accent-blue-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/reset-password"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            <div className="flex justify-center w-full mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full color"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login Account"
                )}
              </button>
            </div>  
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
               { `Don't have an account? `}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </p>
              
            </div>
           
            
          </div>
        </form>
      </div>
    </div>
    </div>
   
  );
};

export default Login;
