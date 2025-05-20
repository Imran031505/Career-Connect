

import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    return (
       
<div className="overflow-x-auto">
  <table className="w-full overflow-hidden transition-all duration-300 animate-[fadeIn_0.6s_ease-out]">
    <thead>
      <tr className=" border-b border-blue-100 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-gray-700 dark:to-gray-800">
        <th className="rounded-l-lg p-8 shadow-xl  transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 text-left py-4 px-4 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-white dark:from-blue-600 dark:to-indigo-600">
          Date
        </th>
        <th className=" shadow-xl  transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 text-left py-4 px-4 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-white dark:from-blue-600 dark:to-indigo-600">
          Company
        </th>
        <th className=" shadow-xl  transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 text-left py-4 px-4 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-white dark:from-blue-600 dark:to-indigo-600">
          Position
        </th>
        <th className="rounded-r-lg shadow-xl  transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 text-left py-4 px-4 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-white dark:from-blue-600 dark:to-indigo-600">
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      {allAppliedJobs.length === 0 ? (
        <tr>
          <td colSpan="4">
            <div className="flex flex-col items-center gap-4 py-8 text-gray-600 dark:text-gray-300 animate-[fadeIn_0.5s_ease-out]">
              <i className="fas fa-briefcase text-4xl"></i>
              <p>No jobs applied yet</p>
            </div>
          </td>
        </tr>
      ) : (
        allAppliedJobs.map((appliedJob, index) => (
          <tr
            key={index}
            className="transition-all font-medium duration-300 hover:bg-blue-50 dark:hover:bg-gray-700/50 border-b border-blue-100/50 dark:border-gray-700/50"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <td className="py-4 px-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500/90 to-indigo-500/90 dark:from-blue-50 dark:to-white">{appliedJob.createdAt?.split("T")[0]}</td>
            <td className="py-4 px-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500/90 to-indigo-500/90 dark:from-blue-50 dark:to-white">{appliedJob.job?.company?.name}</td>
            <td className="py-4 px-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500/90 to-indigo-500/90 dark:from-blue-50 dark:to-white">{appliedJob.job?.title}</td>
            <td className="py-4 px-4">
  <span
    className={`px-3 py-1 rounded-full text-white font-medium shadow-sm hover:scale-105 transition-all duration-300 bg-gradient-to-r ${
      appliedJob?.status === "rejected"
        ? "from-red-500 to-red-700"
        : appliedJob?.status === "pending"
        ? "from-gray-400 to-gray-600"
        : "from-green-500 to-green-700"
    }`}
  >
    {appliedJob.status.toUpperCase()}
  </span>
</td>

          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    )
}

export default AppliedJobTable