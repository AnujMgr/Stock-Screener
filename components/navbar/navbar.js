import React from "react";
import Link from "next/link";
import Toggle from "../toggle";
import SearchBar from "../searchbar";

function Navbar() {
  return (
    <div className="shadow-sm border-b-1 border-fuchsia-100">
      <div className="xl:container mx-auto flex items-center px-4">
        <h1 className="text-3xl text-primary mr-6">Analytics</h1>
        {/* Left Nav Items */}
        <div className="flex-grow px-2">
          <div className="flex justify-between">
            <div className="p-2">
              <SearchBar />
            </div>
            <div>
              <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                <Link className="text-primary" href="/">
                  Home
                </Link>
              </div>
              <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                <Link className="text-primary" href="/">
                  Listing
                </Link>
              </div>
              <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                <Link className="text-primary" href="/">
                  Market
                </Link>
              </div>
              <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
                <Link className="text-primary" href="/">
                  Companies
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Right Nav Items */}
        <div className="flex items-center">
          <Toggle />
          <div className="p-4 hover:border-indigo-700 delay-200 border-transparent border-b-2 flex-grow-0 inline-flex items-center ">
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
