import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../../utils/icons";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button
        className="p-2 shadow-md rounded bg-blue-700 text-white dark:bg-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-gray-900
        transition duration-500 ease-in-out "
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <MoonIcon height="24" width="24" color="#fff" />
        ) : (
          // <MoonIcon height="16" width="16" color="#fff" />
          <SunIcon height="24" width="24" color="#fff" />
        )}
      </button>
    </div>
  );
};
