import React, { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";
import { useTheme } from "next-themes";

export const Toggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button
        className="p-2 rounded bg-ordinary"
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <BiSun className="h-5 w-5 " />
        ) : (
          <BiMoon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};
