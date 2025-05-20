import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Data Scientist", "Backend Developer", "Full Stack Developer","Graphic Designer"],
    },
    {
        filterType: "Skill",
        array: ["React", "Node.js", "Python", "Java", "JavaScript"]
    },
   
];



const FilterCard = () => {
    const [selectedFilter, setSelectedFilter] = useState({
        Location: '',
        Industry: '',
        Skill: '',
       
    });

    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        const updated = {
            ...selectedFilter,
            [filterType]: value,
        };
        setSelectedFilter(updated);

        // Send selected filter to Redux (can be extended to send whole object)
        dispatch(setSearchedQuery(value)); // ✅ Dispatching selected value
    };

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery("")); // Cleanup on unmount
        };
    }, [dispatch]);

    return (
        <div className="w-full md:max-w-[20%] animate-slideRight">
            <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl border border-blue-100 dark:border-gray-600 p-6 md:sticky md:top-24 transition-all duration-300 hover:shadow-lg dark:shadow-blue-900/20">
                <h2 className="text-xl font-bold text-blue-900 dark:text-white mb-6">Filters</h2>
                <div className="h-[500px] overflow-y-auto scrollbar-hide">
                    {filterData.map((data, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                                {data.filterType}
                            </h3>
                            <div className="space-y-3">
                                {data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className="flex items-center space-x-3 group" key={itemId}>
                                            <input
                                                type="radio"
                                                id={itemId}
                                                name={data.filterType}
                                                value={item}
                                                checked={selectedFilter[data.filterType] === item}
                                                onChange={(e) => changeHandler(data.filterType, e.target.value)}
                                                className="w-4 h-4 cursor-pointer accent-blue-600 transition-all duration-300"
                                            />
                                            <label
                                                htmlFor={itemId}
                                                className="cursor-pointer text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            {index !== filterData.length - 1 && (
                                <div className="my-4 border-t border-blue-100 dark:border-gray-600"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
