import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'


const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(company => company._id === e.target.value);
        setInput({ ...input, companyId: selectedCompany ? selectedCompany._id : "" });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const handleBack = useCallback(() => {
        window.history.back();
      }, []);

      const labelClassName = `block text-lg font-medium mb-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent`;

      const inputClassName = `w-full p-3 rounded-lg transition-all duration-300 bg-white border-blue-200 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 border focus:ring-2 focus:ring-blue-500`;

    return (
      <div className="h-screen flex flex-col">
      <Navbar/>
      <div className="flex-grow bg-gradient-to-b px-4 from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" >
    <div className="max-w-4xl mx-auto" >
      <h1 className="text-4xl font-bold pt-8 mb-8 font-roboto text-center" style={{ animation: "fadeIn 0.6s ease-out" }}>
        <span className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">
              Post New Job 
              </span>
              </h1>

            <div className="rounded-lg p-8 shadow-xl backdrop-blur-none transition-all duration-300 transform  hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
    <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
            <div>
                  <label className={labelClassName}>
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="Enter job title"
                   className={inputClassName}
                  />
                </div>
                <div >
                  <label className={labelClassName}>
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    placeholder="Enter job description"
                   className={inputClassName}
                  />
                </div>
                <div >
                  <label className={labelClassName}>
                    Requirements
                  </label>
                  <input
                    type="text"
                    name="requirements"
                    value={input.requirements}
                    onChange={changeEventHandler}
                    placeholder="Enter job requirements"
                   className={inputClassName}
                  />
                </div>
                </div>
                <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
                <div>
                  <label className={labelClassName}>
                    Salary
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={input.salary}
                    onChange={changeEventHandler}
                    placeholder="Enter salary range"
                   className={inputClassName}
                  />
                </div>
  
                <div >
                  <label className={labelClassName}>
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="Enter job location"
                   className={inputClassName}
                  />
                </div>
                <div >
                  <label className={labelClassName}>
                    Job Type
                  </label>
                  <input
                    type="text"
                    name="jobType"
                    value={input.jobType}
                    onChange={changeEventHandler}
                    placeholder="e.g., Full-time, Part-time"
                   className={inputClassName}
                  />
                </div>
                </div>
                <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
              
                <div >
                  <label className={labelClassName}>
                    Experience Level
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={input.experience}
                    onChange={changeEventHandler}
                    placeholder="Required experience"
                   className={inputClassName}
                  />
                </div>
  
                <div >
                  <label className={labelClassName}>
                    Number of Positions
                  </label>
                  <input
                    type="number"
                    name="position"
                    value={input.position}
                    onChange={changeEventHandler}
                    placeholder="Enter number of positions"
                   className={inputClassName}
                  />
                </div>
             
                
              </div>
              <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
              <div>
              {companies.length > 0 && (
                  <div >
                    <label className={labelClassName}>
                      Select a Company
                    </label>
                    <select
                      onChange={selectChangeHandler}
                     className={inputClassName}
                    >
                      <option value="">Select a Company</option>
                      {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )} 
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2  transform hover:scale-105 flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
               hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <i className="fas fa-arrow-left mr-2" />
                  Back
                </button>
  
                <button
                  type="submit"
                  disabled={loading || companies.length === 0}
                 className="px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#1e3a8a] hover:to-[#1e40af] dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-circle-notch animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2" />
                      Post New Job
                    </>
                  )}
                </button>
              </div>
                  </div>
              {companies.length === 0 && (
                <div>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-sm text-center">
                    <i className="fas fa-exclamation-circle mr-2" />
                    Please register a company first before posting jobs
                  </div>
                </div>
              
              )}
              </div>
              </div>
            </form>
          </div>
        </div>
        </div>
  </div>
  
    )
}

export default PostJob;
