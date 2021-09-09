import React from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <section className="xl:container mx-auto">
        <div className="grid grid-cols-5 max-w-4xl mx-auto shadow-sm my-8 rounded-md overflow-hidden">
          <div className="p-3 col-span-3 bg-white dark:bg-gray-900">
            <h1 className="text-center text-2xl my-10 font-bold text-gray-600 dark:text-white">
              Sign in to App
            </h1>
            <div className="bg-gray-100 dark:bg-gray-800  flex items-center max-w-sm rounded-md overflow-hidden mx-auto mt-3">
              <HiOutlineMail className="h-6 w-8 mx-2 text-gray-600" />
              <input
                className="bg-transparent dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-xl"
                type="email"
                placeholder="Email"
                aria-label="Email"
              />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 flex items-center max-w-sm rounded-md overflow-hidden mx-auto mt-3">
              <HiOutlineLockClosed className="h-6 w-8 mx-2 text-gray-600" />
              <input
                className="bg-transparent dark:bg-gray-800 p-1 h-10 rounded-sm outline-none w-full text-xl"
                type="password"
                placeholder="Password"
                aria-label="password"
              />
            </div>

            <div className="text-center mb-8">
              <h1 className="hover:text-blue-800 my-6 transition duration-500 ease-in-out">
                <Link href="/">Forgot Password ?</Link>
              </h1>

              <Link href="/">
                <button className="bg-blue-800 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-500 ease-in-out">
                  SIGN IN{" "}
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-green-400 dark:bg-gray-700 p-3 col-span-2 flex">
            <h1 className="text-center text-2xl text-white mx-auto">
              Welcome Back Page
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
