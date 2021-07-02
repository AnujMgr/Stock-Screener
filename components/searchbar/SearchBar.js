import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";

function SearchBar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
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

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results);
  // };

  // const handleOnHover = (result) => {
  //   // the item hovered
  //   console.log(result);
  // };

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
        <div className="md:w-80">
          <ReactSearchAutocomplete
            items={companies}
            // onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            placeholder="Type in to Search"
            autoFocus
            styling={{
              height: "38px",
              backgroundColor: theme === "light" ? "#F3F4F6" : "#2d3748",
              hoverBackgroundColor: theme === "light" ? "#E5E7EB" : "#6B7280",
              color: theme === "light" ? "#000" : "#fff",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              fontFamily: "Muli",
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default SearchBar;
