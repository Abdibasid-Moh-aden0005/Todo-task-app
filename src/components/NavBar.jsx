import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaUser } from "react-icons/fa";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo/Home Icon - Left */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button - Outside NavLink to prevent navigation */}
            <button
              className="text-2xl px-2 sm:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <MdOutlineCancel className="text-blue-700/80" />
              ) : (
                <TiThMenu className="text-blue-700/80" />
              )}
            </button>

            <NavLink
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <FaHome className="text-2xl sm:text-3xl text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-800 hidden sm:inline">
                Dashboard
              </span>
            </NavLink>
          </div>

          {/* Navigation Links - Center */}
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            <NavLink
              to="/"
              className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FaHome className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>

            <NavLink
              to="/AddTask"
              className={` hidden sm:flex items-center space-x-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                location.pathname === "/AddTask"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <FaPlus className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Add Task</span>
            </NavLink>
          </div>

          {/* mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 mx-4 sm:hidden bg-indigo-300/50 shadow-lg rounded-2xl border border-gray-200 py-4 z-50">
              <div className="flex flex-col justify-center items-center gap-y-5">
                <NavLink
                  to="/"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                    location.pathname === "/"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHome className="text-lg sm:text-xl" />
                  <span>Home</span>
                </NavLink>

                <NavLink
                  to="/AddTask"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors ${
                    location.pathname === "/AddTask"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaPlus className="text-lg sm:text-xl" />
                  <span>Add Task</span>
                </NavLink>
                <button
                  onClick={toggleMenu}
                  className="text-black text-3xl hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <MdOutlineCancel />
                </button>
              </div>
            </div>
          )}

          {/* Login Icon - Right */}
          <div className="flex items-center">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors">
              <FaUser className="text-xl sm:text-2xl" />
              <span className="hidden sm:inline text-sm sm:text-base font-medium">
                Login
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
