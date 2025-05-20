
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Graphic Designer",
    "Full Stack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        
         <div className="flex justify-center max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
         <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
           {category.map((cat, index) => (
             <button
               key={index}
               onClick={() => searchJobHandler(cat)}
               className="flex-none group p-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-blue-100 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 dark:hover:border-gray-600"
             >
               <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300">
                 {cat}
               </span>
             </button>
           ))}
         </div>
         </div>
    );
};

export default CategoryCarousel;

