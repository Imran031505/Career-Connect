import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import {  useSelector } from 'react-redux';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",    
        password: "",
        confirmPassword: "",
        role: "",    
        otp: ""
    });

    const [otpSent, setOtpSent] = useState(false);
    const {  user } = useSelector(store => store.auth);
    const [otpTimer, setOtpTimer] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    
   
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

  

    

    const sendOtpHandler = async () => {
      if (!input.email) {
          return toast.error("Please enter an email!");
      }
  
      try {
          setOtpLoading(true)
          const response = await fetch(`${USER_API_END_POINT}/send-otp`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: input.email }),
          });
  
          const data = await response.json();
          console.log("OTP Response:", data);
  
          if (response.ok) {
              toast.success("OTP sent to your email!");
              setOtpSent(true);
              setOtpTimer(30); // Start countdown
          } else {
              toast.error(data.message || "Something went wrong. Please try again.");
          }
      } catch (error) {
          toast.error("Server error. Please try again.");
      } finally {
          setOtpLoading(false); // ✅ Ensure loading stops after request completion
      }
  };
  
    
      
    const submitHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
  
      try {
          const response = await fetch(`${USER_API_END_POINT}/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  fullname: input.fullname.trim(),
                  email: input.email.trim(),
                  password: input.password,
                  confirmPassword:input.confirmPassword,
                  role: input.role,
                  otp: input.otp.trim(),
              }),
          });
          const data = await response.json();
          if (response.ok) {
              toast.success("🎉 Account created successfully! Redirecting...");
              
              setInput({
                  fullname: "",
                  email: "",             
                  password: "",
                  confirmPassword:"",
                  role: "",
                  otp: "",
              });
              setTimeout(() => navigate("/login"), 1000);
              setSubmitLoading(false)
          } else {
            setSubmitLoading(false)
              toast.error(data.message || "❌ Incorrect OTP or signup failed.");
          }
      } catch (error) {
        setSubmitLoading(false)
          toast.error("⚠️ Server error. Please try again.");
      }
  };
  


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (otpTimer > 0) {
            const interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimer]);

    return (
    
      <div className="h-screen flex flex-col">

      <Navbar/>
      <div className=" flex-grow bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
   
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
        
        </div>
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-full md:w-2/3 lg:w-[44%] backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 my-10 transition-all duration-300 hover:shadow-2xl dark:shadow-blue-900/20"
          >
           <div className=" flex justify-center transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-2xl font-bold text-blue-900 mb-2 dark:text-white animate-slideDown">
              Job<span className="text-blue-600 dark:text-blue-400">Portal</span>
            </h1>
          </div>
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900 dark:text-white animate-slideDown">
              Create Your Account
            </h1>
            <div className="space-y-6">
              <div className="relative transform transition-all duration-300">
                <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                <input
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Full Name"
                />
              </div>
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
                  />
                </div>
                <button
                  type="button"
                  onClick={sendOtpHandler}
                  disabled={otpTimer > 0 || otpLoading}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white font-medium disabled:opacity-50 transition-all duration-300 hover:from-indigo-700 hover:to-blue-700 dark:hover:from-indigo-600 dark:hover:to-blue-600 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                >
                  {otpLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                      <span>Sending...</span>
                    </div>
                  ) : otpTimer > 0 ? (
                    `Resend in ${otpTimer}s`
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>

              {otpSent && (
                <div className="relative animate-slideIn">
                  <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                  <input
                    type="text"
                    name="otp"
                    value={input.otp}
                    onChange={changeEventHandler}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                </div>
              )}

              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Password"
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
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={changeEventHandler}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <i
                    className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 my-5">
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

              <div className="flex justify-center w-full mt-8">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                  >
                    Log In
                  </Link>
                </p>
              </div>
                  
            </div>
          </form>
        </div>
      </div>
      </div>
  
   
  );
}


export default Signup