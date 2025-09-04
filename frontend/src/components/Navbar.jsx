import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md border-b border-blue-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo slightly left with subtle highlight */}
        <div className="text-2xl font-bold text-blue-400 tracking-wide">
          Forty4 Technologies
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link
            to="/login"
            className={`transition-colors duration-200 ${
              location.pathname === "/login" ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`}
          >
            Login
          </Link>
          <Link
            to="/"
            className={`transition-colors duration-200 ${
              location.pathname === "/" ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`}
          >
            Register
          </Link>
          <Link
            to="/dashboard"
            className={`transition-colors duration-200 ${
              location.pathname === "/dashboard" ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
