import React, { useState } from "react";
import Link from "next/link";
import Toggle from "../toggle";
import SearchBar from "../searchbar";
import { BsSearch, BsX } from "react-icons/bs";

function Navbar() {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div className="hidden md:block shadow-sm border-b-1 bg-white dark:bg-gray-800 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex items-center px-4">
          <h1 className="text-2xl text-primary dark:text-white mr-6">
            <Link href="/">Analytics</Link>
          </h1>
          {/* Left Nav Items */}
          <div className="flex-grow px-2">
            <div className="flex justify-between">
              <div className="p-2">
                <SearchBar />
              </div>
              <div>
                <div className="p-4 hover:border-indigo-700 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link className="text-primary" href="/">
                    Home
                  </Link>
                </div>
                <div className="p-4 hover:border-indigo-700 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link className="text-primary" href="/">
                    Listing
                  </Link>
                </div>
                <div className="p-4 hover:border-indigo-700 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link className="text-primary" href="/">
                    Market
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Right Nav Items */}
          <div className="flex items-center">
            <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
              <button>Login</button>
            </div>
            <Toggle />
          </div>
        </div>
      </div>

      <div className="md:hidden shadow-sm border-b-1 bg-white dark:bg-gray-800 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex items-center px-4">
          <h1 className="text-2xl text-primary dark:text-white mr-6">
            <a href="/">Analytics</a>
          </h1>
          {/* Left Nav Items */}
          <div className="flex-grow px-2">
            <div className="flex justify-between">
              <div className="p-2 hidden md:block">
                <SearchBar />
              </div>
            </div>
          </div>
          {/* Right Nav Items */}
          <div className="flex items-center gap-2 my-2">
            {hidden ? (
              <button className="p-2 rounded" onClick={(e) => setHidden(false)}>
                <BsSearch className="h-5 w-5" />
              </button>
            ) : (
              <button className="p-2 rounded" onClick={(e) => setHidden(true)}>
                <BsX className="h-5 w-5" />
              </button>
            )}
            <Toggle />
          </div>
        </div>
        {!hidden ? (
          <div className="p-2">
            <SearchBar />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Navbar;
