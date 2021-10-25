import React from "react";

export default function HeaderButton({ handleClick, isActive, title }) {
  return (
    <button
      onClick={handleClick}
      className={`${
        isActive
          ? " bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 text-white dark:text-white hover:text-white transition duration-500"
          : " bg-white dark:bg-gray-900 hover:bg-blue-800 dark:hover:bg-blue-900 text-dark dark:text-white hover:text-white transition duration-500"
      } font-bold py-4 px-4 border-r border-gray-200 dark:border-gray-800 `}
    >
      {title}
    </button>
  );
}
