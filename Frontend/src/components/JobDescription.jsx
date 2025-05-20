import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/bookmark/status/${jobId}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.success) {
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [jobId]);

  const handleBookmark = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/bookmark/save/${jobId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.success) {
        setIsBookmarked((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b pt-10 pb-5 px-4 from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500">
            Job Details
          </h1>

          {/* Card */}
          <div className="bg-white/80 dark:bg-gray-800/90 p-8 rounded-lg shadow-xl border border-blue-100 dark:border-gray-600 transition-all hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-500 dark:to-indigo-500">
                  {singleJob?.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                  <i className="fas fa-building text-blue-500 mr-2"></i>
                  <span>{singleJob?.company?.name || "Company Name"}</span>
                  <span>•</span>
                  <i className="fas fa-map-marker-alt text-blue-500 ml-2 mr-2"></i>
                  <span>{singleJob?.location}</span>
                </div>
              </div>

              <button
                onClick={handleBookmark}
                className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center hover:scale-110 transition-all"
              >
                <i
                  className={`${
                    isBookmarked ? "fas" : "far"
                  } fa-bookmark text-2xl text-blue-600 dark:text-blue-500`}
                ></i>
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {singleJob?.description}
            </p>

            {/* Tags */}
            <div className="flex gap-3 flex-wrap mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-500 dark:to-indigo-500">
              <span className="badge">
                <i className="fas fa-users mr-2 "></i>
                {singleJob?.position} Positions
              </span>
              <span className="badge">
                <i className="fas fa-clock mr-2"></i>
                {singleJob?.jobType}
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Stat icon="money-bill" label="Salary" value={singleJob?.salary} />
              <Stat
                icon="users"
                label="Experience"
                value={`${singleJob?.experienceLevel} years`}
              />
              <Stat
                icon="calendar"
                label="Posted Date"
                value={singleJob?.createdAt?.split("T")[0]}
              />
            </div>

            {/* Skills */}
            <h2 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-800 dark:from-blue-500 dark:to-indigo-500">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {singleJob?.requirements?.map((item, index) => (
                <span
                  key={index}
                  className="p-2 px-4 rounded-lg border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Apply Button */}
            <div className="flex justify-end">
              <button
                onClick={applyJobHandler}
                disabled={isApplied}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform ${
                  isApplied
                    ? "bg-gray-400 text-white cursor-not-allowed opacity-80"
                    : "bg-blue-600 text-white hover:shadow-lg hover:scale-105 hover:bg-blue-700"
                }`}
              >
                <i className={`fas ${isApplied ? "fa-check-circle" : "fa-paper-plane"} mr-2`}></i>
                {isApplied ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Component
const Stat = ({ icon, label, value }) => (
  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg transition-all hover:scale-105">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
        <i className={`fas fa-${icon} text-blue-500 dark:text-blue-400`}></i>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-medium text-blue-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default JobDescription;
