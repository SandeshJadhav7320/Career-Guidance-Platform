import React from "react";
import { Link } from "react-router-dom";

const Dashboard_Navbar = () => {
    return (
        <>
        
        <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-gray-100 ">
                {/* Brand Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    Career<span className="text-black">Guide</span> AI
                </div>

                {/* Navigation Links with Responsive Handling */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-5">

                    <Link to="/Dashboard" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                        Home  🏠
                    </Link>

                    <Link to="#" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                        Take Assessment 🚀
                    </Link>

                    <Link to="#" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                        Careers 🎯
                    </Link>

                    <Link to="#" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                        Mentors  🎓
                    </Link>

                     <Link to="/profilepage" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300">
                        Profile  🙎
                    </Link>

                </div>
            </nav>
        </>
    );
};

export default Dashboard_Navbar;