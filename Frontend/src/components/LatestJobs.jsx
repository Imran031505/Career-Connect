
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slideDown">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text  dark:from-blue-500 dark:to-indigo-500">
              Latest & Top
            </span>
            <span className="text-blue-900 dark:text-white"> Job Openings</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Discover your next career opportunity
          </p>
        </div>
  
        {allJobs.length === 0 ? (
            <div className="col-span-full text-center py-20 backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl border border-blue-100 dark:border-gray-600 animate-fadeIn transition-all duration-300">
              <p className="text-gray-600 dark:text-gray-300">No Jobs Available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.slice(0, 6).map((job, index) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/description/${job._id}`)}
                  className="group backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl border border-blue-100 dark:border-gray-600 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-500 dark:shadow-blue-900/20 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                  {/* <p className='text-sm text-gray-500'>{daysAgoFunction(job.createdAt) === 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p> */}
                    <div>
                      <h3 className="font-semibold text-xl text-blue-900 dark:text-white transition-colors duration-300">
                        {job?.company?.name}
                      </h3>
                     
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
                        <i className="fas fa-map-marker-alt text-sm text-blue-500 dark:text-blue-400"></i>
                        <p className="text-sm">{job?.location}</p>
                      </div>
                  
                  </div>
    
                  <div className="mt-4">
                    <h2 className="font-bold text-xl text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {job?.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {job?.description}
                    </p>
                  </div>
    
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <Badge className="bg-white/90 dark:bg-gray-800/90 border border-blue-100 dark:border-gray-600 text-blue-600 dark:text-blue-400">
                      <i className="fas fa-users mr-1"></i>
                      {job?.position} Positions
                    </Badge>
                    <Badge className="bg-white/90 dark:bg-gray-800/90 border border-blue-100 dark:border-gray-600 text-blue-600 dark:text-blue-400">
                      <i className="fas fa-clock mr-1"></i>
                      {job?.jobType}
                    </Badge>
                    <Badge className="bg-white/90 dark:bg-gray-800/90 border border-blue-100 dark:border-gray-600 text-blue-600 dark:text-blue-400">
                      <i className="fas fa-money-bill mr-1"></i>
                      {job?.salary}LPA
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
   
    
    )
}

export default LatestJobs