import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import AppliedJobTable from './AppliedJobTable';

import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    return (
       
    <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-gradient-to-b px-4 from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
  <div className="max-w-4xl mx-auto">
    
      <h1 className="text-4xl font-bold pt-8 mb-8 font-roboto text-center" style={{ animation: "fadeIn 0.6s ease-out" }}>
      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-indigo-500">
      Profile
    </span>
    </h1>
    <div
      className="rounded-lg p-8 shadow-xl mb-8 backdrop-blur-none transition-all duration-300 transform hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20"
      style={{ animation: "fadeIn 0.8s ease-out" }}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="mb-6 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300">
            {user?.fullname || "Complete Your Profile"}
            </h2>
            <p className="text-blue-900 dark:text-white">{user?.profile?.bio || "Add a bio to tell more about yourself"}</p>
          </div>

          <div className="space-y-4">
            <div className="flex max-w-96 items-center space-x-3 p-3 rounded-lg transform hover:scale-[1.02] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
              <i className="fas fa-envelope text-2xl  text-blue-600 dark:text-blue-400"></i>
              <div>
                <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Email
                </label>
                <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>{user?.email}</p>
              </div>
            </div>
            <div className="flex max-w-96 items-center space-x-3 p-3 rounded-lg transform hover:scale-[1.01] transition-all duration-300 bg-blue-50 dark:bg-gray-700/50">
              <i className="fas fa-phone text-2xl  text-blue-600 dark:text-blue-400"></i>
              <div>
                <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Phone
                </label>
                <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'> {user?.phoneNumber || "Add your phone number"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative" style={{ animation: "fadeIn 1s ease-out" }}>
        <button
               onClick={() => navigate("/update-profile")}
                className="absolute text-2xl -top-3 -right-4 p-2 rounded-full hover:scale-110 z-10 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600"
                style={{ animation: "float 3s ease-in-out infinite" }}
              >
                <i className="fas fa-edit text-white"></i>
              </button>
          <div className="w-[200px] h-[200px] rounded-full p-1 bg-gradient-to-r  from-blue-600 to-indigo-600 transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <img
              src={user.profile?.profilePhoto || "/image/user.jpg"}
                  alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="rounded-lg p-8 shadow-xl backdrop-blur-none transform hover:scale-[1.02] transition-all duration-300 bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center text-blue-900 dark:text-white  group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
       
          Skills
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
        {user?.profile?.skills?.length > 0 ? (
             user.profile.skills.map((item, index) => (
            <button
              key={index}
              className="p-3 py-1 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-300 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 dark:hover:border-gray-600"
            >
              <span className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300">
              {item}
              </span>
            </button>
          ))
        ) : (
          <span className="font-semibold text-xl text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            Add your skills
          </span>
        )}
        </div>
      </div>

      {isResume ? (
      <div className="rounded-lg p-8 shadow-xl backdrop-blur-none transform hover:scale-[1.02] transition-all duration-300 bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center text-blue-900 dark:text-white">
          <i className="fas fa-file-alt mr-3 font-semibold text-xl text-blue-900 dark:text-whitegroup-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"></i>
          <span className="text-xl">
                    
                   {user.profile.resumeOriginalName || "Resume.pdf"} 
                 </span> 
        </h2>
        <div className="flex justify-center">
          <a 
          href={user.profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600">
            <i className="fas fa-download mr-2"></i>
            Download
          </a>
        </div>
      </div>
      ) : (
        <span className="text-gray-500 dark:text-gray-400">
           
          No resume uploaded yet. 
        </span>
      )} 
    </div>

    <div className="rounded-lg p-8 shadow-xl transform hover:scale-[1.01] transition-all duration-300 bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
      <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:text-white">
        Applied Jobs
      </h2>
      <AppliedJobTable /> 
        </div>
      </div>
    </div>

 
       </div>
        
    );
};

export default Profile;
