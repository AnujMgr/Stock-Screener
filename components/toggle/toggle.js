import React, { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";
import { useTheme } from "next-themes";

export const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button
        className="p-2 shadow-md rounded bg-blue-700 text-white dark:bg-gray-600 hover:bg-blue-600 hover:text-white dark:hover:bg-gray-500
        transition duration-500 ease-in-out "
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <BiMoon className="h-5 w-5" />
        ) : (
          <BiSun className="h-5 w-5 " />
        )}
      </button>
    </div>
  );
};
