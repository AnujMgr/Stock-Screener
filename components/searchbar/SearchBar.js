import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";

function SearchBar({ bg, borderRad, width, color }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [companies, setCompanies] = useState([]);
  const router = useRouter();

  const getCompaniesApi = `http://localhost:8000/company`;
  const fetchCompanies = async () => {
    fetch(getCompaniesApi)
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  };

  useEffect(() => fetchCompanies(), []);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleOnSelect = (item) => {
    // the item selected
    const slug = item.slug;
    router.push({
      pathname: "/company/[slug]",
      query: { slug: slug },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={`${width}`}>
          <ReactSearchAutocomplete
            items={companies}
            // onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            placeholder="Search Company..."
            autoFocus
            styling={{
              height: "38px",
              backgroundColor: bg,
              hoverBackgroundColor: theme === "light" ? "#E5E7EB" : "#6B7280",
              color: color,
              zIndex: 99,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              fontFamily: "Muli",
              borderRadius: borderRad,
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar;
