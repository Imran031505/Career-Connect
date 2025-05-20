import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useNavigate } from "react-router-dom";
import Navbar from './shared/Navbar';

const UpdateProfileDialog = () => {
    
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        resume: user?.profile?.resume || "",
        profilePhoto: user?.profile?.profilePhoto || ""
    });
    

    const changeHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
  }
  

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (e.target.name === "resume") {
      setInput({ ...input,resume: file });
  } else if (e.target.name === "profilePhoto") {
      setInput({ ...input, profilePhoto: file });
  }
}

  

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
formData.append("fullname", input.fullname);
formData.append("email", input.email);
formData.append("phoneNumber", input.phoneNumber);
formData.append("bio", input.bio);
formData.append("skills", input.skills);
if (input.resume) {
  formData.append("resume", input.resume); // Make sure this is not 

}
if (input.profilePhoto) {
  formData.append("profilePhoto", input.profilePhoto);
}

for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]); // Check if 'file' is present
}
    try {
      setLoading(true);
      const res = await axios.post( `${USER_API_END_POINT}/profile/update`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
      });
  
     
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
          toast.success("Profile updated successfully!");
          navigate("/profile");
      }
  } catch (error) {
      console.error("❌ Error Updating Profile:", error.response || error);
      toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
      setLoading(false);
  }
  
};

  
    
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
              <label className={labelClassName}>Full Name</label>
              <input type="text" name="fullname" value={input.fullname} onChange={changeHandler} placeholder="Enter your full name" className={inputClassName} />
            </div>
            <div>
              <label className={labelClassName}>Email</label>
              <input type="email" name="email" value={input.email} onChange={changeHandler} placeholder="Enter your email" className={inputClassName} />
            </div>
            <div>
              <label className={labelClassName}>Phone Number</label>
              <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} placeholder="Enter your phone number" className={inputClassName} />
            </div>
          </div>

          <div className="space-y-4 p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
            <div>
              <label className={labelClassName}>Bio</label>
              <textarea name="bio" value={input.bio} onChange={changeHandler} placeholder="Tell us about yourself" rows="3" className={inputClassName} />
            </div>
            <div>
              <label className={labelClassName}>Skills</label>
              <input type="text" name="skills" value={input.skills} onChange={changeHandler} placeholder="Enter skills (comma separated)" className={inputClassName} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClassName}>Resume</label>
              <input type="file" name="resume" accept="application/pdf" onChange={handleFileChange} className={`${inputClassName} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-opacity-80 dark:file:bg-gray-700 dark:file:text-white file:bg-blue-100 file:text-blue-900`} />
            </div>
            <div>
              <label className={labelClassName}>Profile Photo</label>
              <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} className={`${inputClassName} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-opacity-80 dark:file:bg-gray-700 dark:file:text-white file:bg-blue-100 file:text-blue-900`} />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => navigate("/profile")} className="px-6 py-3 rounded-lg transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#1e3a8a] hover:to-[#1e40af] dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white">
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
      </form>
    </div>
  </div>
</div>
</div>

    );
};

export default UpdateProfileDialog;
