import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchText(query);
    onSearch(query);
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center mb-10 px-6 sm:px-20 py-4 bg-white shadow">
      {/* Logo */}
      <Link to="/" className="text-gray-800 hover:text-gray-900 mb-4 sm:mb-0">
        <h1 className="text-lg sm:text-xl font-bold">
          Crypto API<span className="ms-2 text-xs font-semibold text-gray-500">FREE</span>
        </h1>
      </Link>

      {/* Search bar */}
      <div className="flex items-center w-full sm:w-auto">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-full sm:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="ml-2 w-full sm:w-auto bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
