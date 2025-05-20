

const Footer = () => {


  return (
  
        <footer className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-blue-100 dark:border-gray-700 transition-colors duration-300">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-white">
                    Job
                    <span className="text-blue-600 dark:text-blue-400">Portal</span>
                  </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  Connecting talented professionals with their dream careers.
                </p>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "linkedin"].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-blue-100 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
                      aria-label={social}
                    >
                      {social === "facebook" && (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                        </svg>
                      )}
                      {social === "twitter" && (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                        </svg>
                      )}
                      {social === "linkedin" && (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.324C24 .774 23.205 0 22.225 0z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
    
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                {["Browse Jobs", "Companies"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={
                          item === "Browse Jobs"
                            ? "/browse"  // Path for Browse Jobs
                            : item === "Companies"
                            ? "/admin/companies/create"  // Path for Companies (Create)
                            : `/${item.toLowerCase().replace(" ", "-")}`
                        }
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
              
              
              </div>
    
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  For Job Seekers
                </h3>
                <ul className="space-y-2">
                {[
                  "Create Profile",
                  "Job Alerts",
                  
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={
                        item === "Create Profile"
                          ? "/profile"  // Path for Create Profile
                          : item === "Job Alerts"
                          ? "/jobs"  // Path for Job Alerts
                          : `/${item.toLowerCase().replace(" ", "-")}`
                      }
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              
              
              </div>
    
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Contact Us
                </h3>
                <ul className="space-y-2">
                  {[
                    { icon: "envelope", text: "support@jobportal.com" },
                    { icon: "phone", text: "+1 (555) 123-4567" },
                    { icon: "map-marker-alt", text: "123 Job Street, Career City" },
                  ].map((item) => (
                    <li key={item.icon} className="flex items-center space-x-2">
                      <i
                        className={`fas fa-${item.icon} text-blue-600 dark:text-blue-400`}
                      ></i>
                      <span className="text-gray-700 dark:text-gray-200">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
    
            <div className="mt-12 pt-8 border-t border-blue-100 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  © {new Date().getFullYear()} JobPortal. All rights reserved.
                </p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                    (item) => (
                      <a
                        key={item}
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {item}
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </footer>
  );
}

export default Footer;