
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'


const Job = ({job}) => {
    const navigate = useNavigate();
   
  console.log(job._id)
   
    if (!job) {
        return null; // Return null if job data is not available
    }// style={{ animationDelay: `${index * 100}ms` }}
      {/* <p className='text-sm text-gray-500'>{daysAgoFunction(job.createdAt) === 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p> */}
    return (
        <div className="flex-1">
        <div
        key={job._id}
        onClick={() => navigate(`/description/${job._id}`)}
        className="group backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl border border-blue-100 dark:border-gray-600 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-500 dark:shadow-blue-900/20 animate-fadeIn"
        
      >
        <div className="flex items-start justify-between">
      
          <div>
            <h3 className="font-semibold text-xl text-blue-900 dark:text-white transition-colors duration-300">
              {job?.company?.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-400">
              <i className="fas fa-map-marker-alt text-sm text-blue-500 dark:text-blue-400"></i>
              <p className="text-sm"> {job?.location}</p>
            </div>
          </div>
          
          
        
        </div>

        <div className="mt-4">
          <h2 className="font-semibold text-xl text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
      </div>
    )
}

// Add PropTypes validation
Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        location:PropTypes.string.isRequired,
        position: PropTypes.number.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired,
            logo: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

export default Job