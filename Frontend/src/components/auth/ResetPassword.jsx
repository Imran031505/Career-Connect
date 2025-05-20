import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import Navbar from "../shared/Navbar";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
      

        try {
            await axios.post(`${USER_API_END_POINT}/send-reset-otp`, { email });
            toast.success("OTP sent successfully!");
            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }

        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
      
    
        if (!email || !otp || !newPassword || !confirmPassword) {
            toast.error("All fields are required!");
            setLoading(false);
            return;
        }
    
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }
    
        try {
            const res = await axios.post(`${USER_API_END_POINT}/reset-password`, {
                email, 
                otp,
                newPassword,
                confirmNewPassword: confirmPassword, 
            });
    
            toast.success(res.data.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    
        setLoading(false);
    };
    

    return (
    
      <div className="h-screen flex flex-col">
<Navbar/>
        <div className="flex-grow bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4  transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end"></div>
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <div className="w-full md:w-2/3 lg:w-[44%] backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg p-8 my-10 transition-all duration-300 hover:shadow-2xl dark:shadow-blue-900/20">
            <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
              <h1 className="text-2xl font-bold mb-2 text-blue-900 dark:text-white">
                Job
                <span className="text-blue-600 dark:text-blue-400">Portal</span>
              </h1>
            </div>
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900 dark:text-white">
              Reset Password
            </h1>
            <div className="space-y-6">
              {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
  
                  <div className="flex justify-center w-full mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                          <span>Sending OTP...</span>
                        </div>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="space-y-6">
                    <div className="relative flex-1">
                      <i className="fas fa-key absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
  
                    <div className="relative">
                      <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
  
                    <div className="relative">
                      <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                      <input
                         type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
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
  
                    <div className="flex justify-center w-full mt-8">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                            <span>Resetting...</span>
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
  
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    
    );
};

export default ResetPassword;