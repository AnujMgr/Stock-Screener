import React, { useState } from "react";
import Link from "next/link";
import Toggle from "../toggle";
import SearchBar from "../searchbar";
import { BsSearch, BsX } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useAppContext } from "../../lib/contexts/State";

function Navbar({ showSearch }) {
  const [hidden, setHidden] = useState(true);
  const { theme } = useTheme();
  const { companies } = useAppContext();
  return (
    <>
      <div className="hidden md:block shadow-sm bg-white dark:bg-gray-700 border-b border-fuchsia-100 border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex items-center px-4">
          <h1 className="text-2xl text-primary dark:text-white lg:mr-6">
            <Link href="/">Analytics</Link>
          </h1>
          {/* Left Nav Items */}
          <div className="flex-grow px-2">
            <div className="flex justify-between">
              <div className="p-2">
                {showSearch ? (
                  <SearchBar
                    bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
                    borderRad={"25px"}
                    width={"md:w-60 lg:w-80"}
                    color={theme === "light" ? "#000" : "#fff"}
                    companies={companies.getAllCompanies}
                  />
                ) : null}
              </div>

              <div>
                <div className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link className="" href="/">
                    Home
                  </Link>
                </div>
                <div className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link href={`/screener`}>Screener</Link>
                </div>
                <div className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link className="" href="/">
                    Listing
                  </Link>
                </div>
                <div className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                  <Link href="/">Market</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Right Nav Items */}
          <div className="flex items-center">
            <div className="p-4 dark:text-white text-gray-900 hover:border-indigo-700 dark:hover:border-gray-50 transition duration-500 ease-in-out border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
              <Link href="/login">Login</Link>
            </div>
            <Toggle />
          </div>
        </div>
      </div>

      <div className="md:hidden shadow-sm border-b-1 bg-white dark:bg-gray-800 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl dark:text-white text-gray-900 mr-6">
            <Link href="/">Analytics</Link>
          </h1>
          {/* Right Nav Items */}
          <div className="flex items-center gap-2 my-2">
            {hidden ? (
              <button className="p-2 rounded" onClick={(e) => setHidden(false)}>
                <BsSearch className="h-5 w-5" />
              </button>
            ) : (
              <button className="rounded" onClick={(e) => setHidden(true)}>
                <BsX className="h-8 w-8 text-md" />
              </button>
            )}
            <Toggle />
          </div>
        </div>
        {!hidden ? (
          <div className="p-2">
            <SearchBar
              bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
              borderRad={"6px"}
              width={"w-full sm:w-3/4 mx-auto"}
              color={theme === "light" ? "#000" : "#fff"}
              companies={companies.getAllCompanies}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Navbar;
