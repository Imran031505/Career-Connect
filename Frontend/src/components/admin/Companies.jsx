
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const Companies = () => {
    useGetAllCompanies();
    const { user } = useSelector(store => store.auth);
    const { companies } = useSelector(store => store.company);
   const navigate = useNavigate();
    return (
        

    <div className="h-screen flex flex-col">
    <Navbar/>
    <div className="flex-grow bg-gradient-to-b px-4 from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {companies.length === 0 ? (
        <div className="flex justify-center items-center h-full min-h-[400px]">
        <div
          className="text-center transform hover:scale-105 transition-all duration-300"
          style={{
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center transform hover:rotate-12 transition-all duration-500">
              <i className="fas fa-building text-4xl text-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 animate-float"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              No Company Profile Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Create your company profile to showcase your business and
              connect with potential candidates
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/companies/create")}
            className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
          >
            <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="flex items-center gap-3">
              <i className="fas fa-plus-circle text-xl group-hover:rotate-90 transition-transform duration-500"></i>
              <span>Create Company Profile</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      </div>
      ) : (
        companies.map((company) => (
          <div key={company._id} className="max-w-4xl mx-auto">
            <h1
              className="text-4xl font-bold pt-8 mb-8 font-roboto text-center relative group"
              style={{ animation: "fadeIn 0.6s ease-out" }}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-500 dark:to-indigo-500 group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                Company Profile
              </span>
              
            </h1>

            <div className="rounded-lg p-8 shadow-xl mb-8 backdrop-blur-none transition-all duration-300 transform hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="mb-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-3 relative inline-block">
                      <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent hover:from-blue-800 hover:to-indigo-800 transition-all duration-300">
                        {company.name || "Complete Your Profile"}
                      </span>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center md:justify-start gap-2">
                      <i className="far fa-calendar-alt text-blue-600 dark:text-blue-400 w-5 h-5"></i>
                      {new Date(company.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-gray-700/50 rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <i className="fas fa-info-circle text-2xl text-blue-600 dark:text-blue-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                          About Company
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {company.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="relative"
                  style={{ animation: "fadeIn 1s ease-out" }}
                >
                  <button
                    onClick={() =>
                      navigate(`/admin/companies/${company._id}`)
                    }
                    className="absolute -top-6 -right-4 p-3 rounded-full hover:scale-110 z-10 transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500"
                  >
                    <i className="fas fa-edit text-white w-6 h-5"></i>
                  </button>
                  <div className="w-[200px] h-[200px] rounded-full p-[2px] bg-gradient-to-r from-blue-600 to-indigo-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4 rounded-lg p-6 backdrop-blur-none transition-all duration-300 transform hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 w-full">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:scale-[1.02] transition-all duration-300 w-full">
               
                    <i className="fas fa-envelope text-2xl text-blue-600 dark:text-blue-400 mt-1"></i>
               
                  <div className="flex-1 min-w-0">
                    <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Email
                    </label>
                   <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:scale-[1.02] transition-all duration-300 w-full">
                
                    <i className="fas fa-phone text-2xl text-blue-600 dark:text-blue-400 mt-1"></i>
               
                  <div className="flex-1 min-w-0">
                    <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Phone
                    </label>
                   <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                      {company.phoneNumber || "Add your phone number"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 rounded-lg p-6 backdrop-blur-none transition-all duration-300 transform hover:scale-[1.01] bg-white/80 border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 dark:bg-gray-800/50 dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 w-full">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:scale-[1.02] transition-all duration-300 w-full">  
                    <i className="fas fa-globe text-2xl text-blue-600 dark:text-blue-400 mt-1"></i>      
                  <div className="flex-1 min-w-0">
                    <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Website
                    </label>
                   <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                      {company.website}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-gray-700/50 hover:scale-[1.02] transition-all duration-300 w-full">

                    <i className="fas fa-map-marker-alt text-2xl text-blue-600 dark:text-blue-400 mt-1"></i>
        
                  <div className="flex-1 min-w-0">
                    <label className="font-semibold text-lg text-blue-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      Location
                    </label>
                   <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] group-hover:from-[#2563eb] group-hover:to-[#1e3a8a] dark:text-white *:transition-all duration-300'>
                      {company.location || "Add your location"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
    );
};

export default Companies;
