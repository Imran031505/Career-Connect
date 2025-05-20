import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["accepted", "rejected"];

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [applicationStatus, setApplicationStatus] = useState({});

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  const statusHandler = async (status, id, email) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        // Update local state
        setApplicationStatus((prevStatus) => ({
          ...prevStatus,
          [id]: status,
        }));
  
        // Send email to applicant (this part should happen in the backend)
        toast.success(res.data.message);
  
        // Optionally, you can call a separate backend function here to send the email to the user
        // Example:
        // await axios.post(`${APPLICATION_API_END_POINT}/send-email`, { email, status });
  
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  
  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b px-4 from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl  font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-blue-600 *:transition-all duration-300">
                  Applicant Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative"></div>

                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2  transform hover:scale-105 flex items-center space-x-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
               hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <i className="fas fa-arrow-left mr-2" />
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-5 text-left  font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Applicant Details
                    </th>
                    <th className="px-6 py-5 text-left font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Contact Information
                    </th>
                    <th className="px-6 py-5 text-left  font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-5 text-left  font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Application Date
                    </th>
                    <th className="px-6 py-5 text-left  font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-5 text-right  font-medium text-base text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {applicants?.applications?.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {item?.applicant?.fullname?.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item?.applicant?.fullname}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Applied for: Software Engineer
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item?.applicant?.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item?.applicant?.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.applicant?.profile?.resume ? (
                          <a
                            href={item?.applicant?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 rounded-lg text-sm
                bg-blue-50 text-blue-700 hover:bg-blue-100
                dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30
                transition-colors duration-200"
                          >
                            <i className="fas fa-file-pdf mr-2"></i>
                            View Resume
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400 dark:text-gray-500">
                            No resume uploaded
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item?.applicant?.createdAt
                          ? new Date(
                              item.applicant.createdAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            (applicationStatus[item._id] || item.status) ===
                            "accepted"
                              ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                              : (applicationStatus[item._id] || item.status) ===
                                "rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                          }`}
                        >
                          {(applicationStatus[item._id] || item.status)
                            ?.charAt(0)
                            .toUpperCase() +
                            (applicationStatus[item._id] || item.status)?.slice(
                              1
                            )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block text-left group">
                          <button
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                          >
                            <i className="fas fa-ellipsis-h w-5 h-5 text-gray-500 dark:text-gray-400"></i>
                          </button>
                          <div
                            className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 
              ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700
              transform opacity-0 scale-95 transition-all duration-200 ease-out
              group-hover:opacity-100 group-hover:scale-100"
                          >
                            {shortlistingStatus.map((status, index) => (
                              <div
                                key={index}
                                onClick={() => statusHandler(status, item?._id)}
                                className=" z-10 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 
                    hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer
                    first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                              >
                                <div className="flex items-center">
                                  <span
                                    className={`w-2 h-2 rounded-full mr-2 ${
                                      status === "accepted"
                                        ? "bg-green-500"
                                        : status === "rejected"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                    }`}
                                  />
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </div>
                              </div>
                            ))}
                          </div>
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

console.log(Applicants);

export default Applicants;
