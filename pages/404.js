import Link from "next/link";
import React from "react";
import SearchBar from "../components/searchbar";
import { useTheme } from "next-themes";

export default function Custom404() {
  const { theme } = useTheme();
  // const { companies } = useAppContext();

  return (
    <section className="xl:container mx-3 xl:mx-auto mt-8 px-2 py-5 md:p-5 mb-3">
      <h1 className="text-9xl mt-8 text-center dark:text-red-400 text-indigo-400">
        404
      </h1>
      <h1 className="text-3xl text-center mb-5 text-gray-700 dark:text-gray-50">
        Sorry, Page Not Found
      </h1>
      <div className="md:flex justify-center w-full">
        <SearchBar
          bg={theme === "light" ? "#F3F4F6" : "#2d3748"}
          borderRad={"10px"}
          width={"w-full sm:w-3/4 md:w-96 mx-auto"}
          color={theme === "light" ? "#000" : "#fff"}
        />
      </div>
      <div className="text-center mt-8">
        <button className="p-2 bg-blue-800 mx-3 text-white shadow-md rounded-md">
          <Link href="/">Home</Link>
        </button>
        <Link href="/" className="p-2 bg-blue-600">
          Contact
        </Link>
      </div>
    </section>
  );
}
