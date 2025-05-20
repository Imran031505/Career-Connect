import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { setSearchJobByText } from '@/redux/jobSlice';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  useEffect(() => { 
    const filteredJobs = allAdminJobs.map((job) => ({
      ...job,
      newApplicants: job.applicants?.filter(applicant => applicant.status === "new")?.length || 0
    })).filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
             job?.location?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const handleDeleteJob = async (jobId) => {
    if(window.confirm("Are you sure you want to delete this job?")){
      try {
        await axios.delete(`${JOB_API_END_POINT}/deleteJob/${jobId}`, { withCredentials: true });
        setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
      } catch(error) {
        console.error("Error deleting job", error);
      }
    }
  };

  return (
    <div>
    <Navbar />
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-up">
        <div className="bg-white/80 border border-blue-100 rounded-lg hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                Total Jobs
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filterJobs.length}
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3  rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-300  ">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
       d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
     />
   </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/80 border border-blue-100 rounded-lg hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                Pending Applications
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filterJobs.reduce(
                  (acc, job) => acc + (job.pendingApplicationsCount || 0),
                  0
                )}
              </h3>
             
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40 transition-colors duration-300">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
     />
   </svg>
            </div>
          </div>
        </div>

        <div className="bg-white/80 border border-blue-100 rounded-lg hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 p-6 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                Total Applications
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filterJobs.reduce(
                  (acc, job) => acc + (job.totalApplications || 0),
                  0
                )}
              </h3>
             
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors duration-300">
              <i className="fas fa-users w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-64 md:w-72">
        <input
       value={input}
       onChange={(e) => setInput(e.target.value)}
       className="w-full px-12 py-4 rounded-2xl
         bg-white/80 dark:bg-gray-800/80 
         backdrop-blur-lg
         border-2 border-gray-100 dark:border-gray-700
         text-gray-800 dark:text-gray-200
         placeholder-gray-400 dark:placeholder-gray-500
         shadow-sm transition-all duration-300
         focus:border-blue-500 dark:focus:border-blue-400
         focus:ring-4 focus:ring-blue-500/20
         focus:outline-none
         hover:border-gray-300 dark:hover:border-gray-600"
       placeholder="Search jobs, companies, or keywords... (⌘K)"
     />
     <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
     </svg>
        </div>

        <button
        onClick={() => navigate("/admin/jobs/create")}
          className="w-full sm:w-auto px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#1e3a8a] hover:to-[#1e40af] dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white"
        >
          <i className="fas fa-plus"> </i>
           <span>New Jobs</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800  shadow-soft overflow-hidden animate-fade-up-delay-2 rounded-lg shadow-xl mb-8 backdrop-blur-none transition-all duration-300 transform hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 ">
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 flex justify-center">
            Posted Jobs Overview
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex justify-center">
            A list of your recent posted jobs and their current status
          </p>
        </div>

        <div className="overflow-x-auto  ">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-750 text-left text-base">
                <th className="  px-6 py-3  font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3  font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Job Type
                </th>
                <th className="px-6 py-3  font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date Posted
                </th>
                <th className="px-6 py-3  font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Positions
                </th>
                <th className="px-6 py-3  font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filterJobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 
                             hover:backdrop-blur-sm
                             group cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {job.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-blue-500"></i>
                      {job.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 
                                 text-blue-800 dark:text-blue-200 font-medium"
                    >
                      {job.jobType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600 dark:text-gray-300">
                    {job.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm   text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <i className="far fa-calendar text-gray-400"></i>
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === job._id ? null : job._id
                          )
                        }
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full 
                                 transition-colors duration-200"
                      >
                        <i className="fas fa-ellipsis-h text-gray-500 dark:text-gray-400"></i>
                      </button>

                      {activeMenu === job._id && (
                        <div
                          className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 
                                   shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                                   transform opacity-0 scale-95 animate-dropdown"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                                       hover:bg-gray-100 dark:hover:bg-gray-700 w-full"
                            >
                              <i
                                className="fas fa-trash mr-3 text-gray-400 group-hover:text-red-500 
                                        transition-colors duration-200"
                              ></i>
                              Delete Job
                            </button>

                            <button
                             onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                              className="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                                       hover:bg-gray-100 dark:hover:bg-gray-700 w-full relative"
                            >
                              <i
                                className="fas fa-eye mr-3 text-gray-400 group-hover:text-blue-500 
                                        transition-colors duration-200"
                              ></i>
                              View Applicants
                              {job.pendingApplicationsCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
                        {job.pendingApplicationsCount}
                      </span>
                    )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
};

export default AdminJobs;
