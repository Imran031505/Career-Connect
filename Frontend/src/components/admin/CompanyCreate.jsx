import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const { companies } = useSelector(state => state.company);

    useEffect(() => {
        // If company already exists, redirect to companies page
        if (companies && companies.length > 0) {
            toast.error("You can only create one company");
            navigate("/admin/companies");
        }
    }, [companies, navigate]);

    const registerNewCompany = async () => {
        try {
            if (!companyName) {
                toast.error("Please enter company name");
                return;
            }

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
            <Navbar/>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl dark:shadow-blue-900/10 border border-blue-100/50 dark:border-gray-700/50 backdrop-blur-lg backdrop-saturate-150 transform hover:scale-[1.01] motion-safe:hover:-translate-y-1 transition-all duration-500 ease-out">
            <div className="space-y-6 mb-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 group-hover:opacity-30 blur-xl transform group-hover:scale-110 transition-all duration-500"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center overflow-hidden transform group-hover:rotate-12 transition-all duration-500">
                    <i className="fas fa-building text-3xl sm:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 animate-float"></i>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
                    Create Your Company Profile
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-xl animate-slideUp">
                   {` Let's get started with your company's presence on our
                    platform. You can always update these details later.`}
                  </p>
                </div>
              </div>
            </div>
  
            <div className="space-y-8 animate-slideUp delay-150">
              <div className="group">
                <label className="block text-lg font-semibold text-gray-700  dark:text-gray-300 mb-3">
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-briefcase text-gray-400 dark:text-gray-600"></i>
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg
                             focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400
                             transition-all duration-300 ease-in-out
                             placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder="Enter your company name (e.g., JobHunt, Microsoft)"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  This name will represent your company across the platform
                </p>
              </div>
  
              <div className="flex items-center gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => navigate("/admin/companies")}
                  className="group flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                           text-gray-700 dark:text-gray-300 font-semibold
                           hover:border-gray-300 dark:hover:border-gray-600
                           transition-all duration-300 ease-in-out"
                >
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-300"></i>
                    Cancel
                  </span>
                </button>
                <button
                  onClick={registerNewCompany}
                  className="group flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                           hover:from-blue-700 hover:to-indigo-700
                           text-white font-semibold shadow-lg shadow-blue-500/30
                           transform hover:translate-y-[-1px] hover:shadow-xl hover:shadow-blue-500/40
                           transition-all duration-300 ease-in-out"
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Company
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    );
};

export default CompanyCreate;
