import React, { useState } from "react";
import Link from "next/link";
import Toggle from "../toggle";
import SearchBar from "../searchbar";
import { BsSearch, BsX } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useAppContext } from "../../lib/contexts/State";

function Navbar({ showSearch }) {
  const [hidden, setHidden] = useState(true);
  const [isOpen, setOpen] = useState(true);
  const { theme } = useTheme();
  const { companies } = useAppContext();
  return (
    <>
      <div className="hidden lg:block shadow-sm bg-white dark:bg-gray-700 border-b border-fuchsia-100 border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex items-center px-4">
          <h1 className="text-2xl text-primary dark:text-white lg:mr-6">
            <Link href="/">Analytics</Link>
          </h1>
          {/* Left Nav Items */}
          <div className="flex-grow px-2">
            <div className="flex justify-between">
              <div className="p-2 flex-1">
                {showSearch ? (
                  <SearchBar
                    bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
                    borderRad={"0.4em"}
                    width={"w-full sm:w-3/4 mr-auto"}
                    color={theme === "light" ? "#000" : "#fff"}
                    companies={companies.getAllCompanies}
                  />
                ) : null}
              </div>

              <div className="flex-1 text-right">
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

      <div className="lg:hidden shadow-sm border-b-1 bg-white dark:bg-gray-700 border-fuchsia-100 border-b border-gray-100 dark:border-gray-600">
        <div className="xl:container mx-auto flex justify-between items-center px-4">
          <div>
            <h1 className="lg:block hidden text-2xl dark:text-white text-gray-900 mr-6">
              <Link className="hidden lg:block" href="/">
                Analytics
              </Link>
            </h1>
            <button
              onClick={(e) => setOpen(!open)}
              className="lg:hidden block p-2 shadow-md rounded bg-blue-700 text-white dark:bg-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-gray-500
              transition duration-500 ease-in-out "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="h-5 w-5 "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
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

      <div
        className={`bg-gray-50 dark:bg-gray-800 dark:border-gray-600 lg:hidden h-screen w-full max-w-md fixed top-0 bottom-0 z-max-2 shadow-md transition-all duration-500 ease-in-out ${
          isOpen ? "-left-full" : "left-0"
        }`}
      >
        <div className="xl:container mx-auto flex justify-between items-center px-4 border-b border-gray-300 dark:border-gray-500 ">
          <h1 className="text-2xl dark:text-white text-gray-900 mr-6">
            <a href="/">Analytics</a>
          </h1>
          <div className="flex items-center gap-2 my-2">
            <button
              onClick={(e) => setOpen(!isOpen)}
              className="p-2 shadow-md rounded bg-blue-700 text-white dark:bg-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-gray-500
              transition duration-500 ease-in-out "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="h-5 w-5 "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="p-4 dark:text-white text-gray-900  flex-grow-0 inline-flex items-center ">
            <Link className="dark:text-white text-gray-900" href="/">
              Home
            </Link>
          </div>
          <div className="p-4 dark:text-white text-gray-900  flex-grow-0 inline-flex items-center ">
            <Link href={`/screener`}>Screener</Link>
          </div>
          <div className="p-4 dark:text-white text-gray-900  flex-grow-0 inline-flex items-center ">
            <Link className="" href="/">
              Listing
            </Link>
          </div>
          <div className="p-4 dark:text-white text-gray-900  flex-grow-0 inline-flex items-center ">
            <Link href="/">Market</Link>
          </div>
        </div>
      </div>
      {isOpen ? null : (
        <div
          onClick={(e) => setOpen(true)}
          className="bg-black h-screen w-screen z-max-1 fixed top-0 bottom-0 opacity-70 lg:hidden"
        ></div>
      )}
    </>
  );
}

export default Navbar;
