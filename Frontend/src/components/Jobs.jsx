import  { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        < div className="h-screen flex flex-col">
            <Navbar />
      <div className="flex-grow bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-slideDown">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
              Find Your{" "}
              <span className="text-blue-600 dark:text-blue-400">Perfect</span>{" "}
              Job
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Filter and explore available positions
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
                        <FilterCard />
                   
                
                    {
                        filterJobs.length <= 0 ? <div className="backdrop-blur-sm w-full bg-white/80 dark:bg-gray-800/90 rounded-xl border border-blue-100 dark:border-gray-600 p-12 text-center animate-fadeIn">
                        <i className="fas fa-search text-4xl text-blue-500 dark:text-blue-400 mb-4"></i>
                        <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-2">
                          No Jobs Found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Try adjusting your filters to find more opportunities
                        </p>
                      </div> : (
                           
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                                {
                                  filterJobs.map((job) => (
                                    <motion.div
                                      key={job._id}
                                      initial={{ opacity: 0, x: 100 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -100 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Job job={job} />
                                    </motion.div>
                                  ))
                                }
                                
                                </div>
                           
                        )
                    }
</div>
                </div>
            </div>
            </div>
           
    )
}

export default Jobs