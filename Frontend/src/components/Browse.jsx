import { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, loading } = useSelector(store => store.job); // Assuming you have a loading state
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({allJobs.length})
                </h1>
                {loading ? (
                    <div className="text-center">Loading...</div> // Simple loading message
                ) : allJobs.length === 0 ? (
                    <div className="text-center">No jobs available</div> // Empty list message
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browse;


