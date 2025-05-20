import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';

import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        phoneNumber:"",
        file: "",
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file:file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        formData.append("phoneNumber", input.phoneNumber);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await fetch(`${COMPANY_API_END_POINT}/update/${params.id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update company.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            phoneNumber:singleCompany.phoneNumber || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    const labelClassName = `block text-lg font-medium mb-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent`;

    const inputClassName = `w-full p-3 rounded-lg transition-all duration-300 bg-white border-blue-200 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 border focus:ring-2 focus:ring-blue-500`;

    return (
                  
    <div className="h-screen flex flex-col">
    <Navbar/>
    <div className="flex-grow bg-gradient-to-b px-4 from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" >
  <div className="max-w-4xl mx-auto" >
    <h1 className="text-4xl font-bold pt-8 mb-8 font-roboto text-center" style={{ animation: "fadeIn 0.6s ease-out" }}>
      <span className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] dark:from-blue-500 dark:to-indigo-500 bg-clip-text text-transparent">
        Update Profile
      </span>
    </h1>

    <div className="rounded-lg p-8 shadow-xl backdrop-blur-none transition-all duration-300 transform  hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
    <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
            <div>
            <label className={labelClassName}>Company Name</label>
                  <input type="text" name="name" value={input.name} onChange={changeEventHandler}
                   className={inputClassName} placeholder="Enter company name"/>
                </div>
                
                <div>
                  <label className={labelClassName}>Website</label>
                  <input type="url" name="website" value={input.website} onChange={changeEventHandler}
                    className={inputClassName} placeholder="https://example.com"/>
                </div>
                
                {/** Location */}
                <div>
                  <label className={labelClassName}>Location</label>
                  <input type="text" name="location" value={input.location} onChange={changeEventHandler}
                    className={inputClassName}/>
                </div>
                </div>
                
               
          <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
            <div>
                  <label className={labelClassName}>Contact</label>
                  <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                    className={inputClassName}  placeholder="Enter contact number"/>
                </div>
             
                <div>
                <label className={labelClassName}>Description</label>
                <textarea name="description" value={input.description} onChange={changeEventHandler} rows={4}
                  className={inputClassName}/>
              </div>
              </div>
        </div>
             
        <div className="p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
    {/* Company Logo Input */}
    <div>
      <label className={labelClassName}>Company Logo</label>
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={changeFileHandler}
        className={`${inputClassName} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-opacity-80 dark:file:bg-gray-700 dark:file:text-white file:bg-blue-100 file:text-blue-900`}
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={() => navigate("/admin/companies")}
        className="px-6 py-2  transform hover:scale-105 flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
               hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        Back
      </button>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#1e3a8a] hover:to-[#1e40af] dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
      >
        {loading ? (
          <>
            <i className="fas fa-spinner animate-spin mr-2"></i>
            <span>Please wait</span>
          </>
        ) : (
          <span>Update Profile</span>
        )}
      </button>
    </div>
  </div>
</div>

            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default CompanySetup;
