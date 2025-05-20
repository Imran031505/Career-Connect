// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../ui/toggle'
import { useState, useEffect } from 'react';

const Navbar = () => {

    
    const { user } = useSelector(store => store.auth);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }


    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const onThemeToggle = () => {
        setIsDark(prev => !prev);
    };

    return (
        <div className="sticky top-0 z-10 bg-gradient-to-b  from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl md:text-5xl lg:text-2xl font-extrabold leading-tight tracking-tight text-center animate-slideDown">
  <span className="block font-[Poppins] italic text-blue-900 dark:text-white">
    Career
  </span>
  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text dark:from-blue-500 dark:to-indigo-500 drop-shadow-sm">
    CONNECT
  </span>
</h1>

        

        
        
        
          </div>
          <div className="flex items-center gap-12">
            <ul className="hidden md:flex font-medium items-center gap-5">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="flex items-center gap-4">
            
              <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
  
              {!user ? (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <button className="px-4 py-2 rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
                      Signup
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full border-2 border-blue-100 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 overflow-hidden">
                    <img
                      src={user.profile?.profilePhoto || "/image/user.jpg"}

                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="absolute right-0 mt-2 w-80 backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-gray-600  opacity-0 scale-95 invisible transition-all duration-2000 delay-500
        group-hover:opacity-100 group-hover:scale-100 group-hover:visible z-10">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-100 dark:border-gray-600 overflow-hidden">
                        <img
                          src={
                            user.profile?.profilePhoto || "/image/user.jpg"
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {user.fullname}
                        </h4>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      {user.role === "student" && (
                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-300 group">
                          <i className="fas fa-user text-blue-500 dark:text-blue-400"></i>
                          <Link
                            to="/profile"
                            className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                          >
                            View Profile
                          </Link>
                        </div>
                      )}
                      <div
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors duration-300 group cursor-pointer"
                        onClick={logoutHandler}
                      >
                        <i className="fas fa-sign-out-alt text-red-500 dark:text-red-400"></i>
                        <span className="text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-300">
                          Logout
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navbar;
