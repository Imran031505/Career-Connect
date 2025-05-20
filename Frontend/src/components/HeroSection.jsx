import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import LatestJobs from './LatestJobs';
import CategoryCarousel from './CategoryCarousel';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="min-h-[70vh] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
            <div className="container mx-auto">
                <div className="text-center max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 md:gap-8">
                        <div className="animate-slideDown">
                            <span className="inline-block mx-auto px-6 py-2.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-[#F83002] dark:text-[#ff6347] font-medium backdrop-blur-sm border border-blue-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
                                No. 1 Job Hunt Website
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 dark:text-white transition-colors duration-300 animate-slideDown">
                            Search, Apply & <br /> Get Your{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text  dark:from-blue-500 dark:to-indigo-500">
                                Dream Jobs
                            </span>
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors duration-300 animate-slideDown">
                            Start your journey to success with a job that aligns with your skills and passion. Browse
                            through various industries and find your perfect match today!
                        </p>

                        <div className="flex flex-col sm:flex-row w-full md:w-[80%] lg:w-[60%] xl:w-[50%] backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 shadow-lg border border-blue-100 dark:border-gray-700 rounded-full items-center gap-2 mx-auto p-2 transition-all duration-300 hover:shadow-xl animate-slideUp">
                            <div className="relative flex-1 w-full">
                                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400"></i>
                                <input
                                    type="text"
                                    placeholder="Find your dream jobs"
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                                />
                            </div>
                            <button
                                onClick={searchJobHandler}
                                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-full transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-search text-sm"></i>
                                <span>Search</span>
                            </button>
                        </div>           
                    </div>
                </div>
            </div>
            <CategoryCarousel />
            <LatestJobs />
        </div>
    );
}

export default HeroSection;
