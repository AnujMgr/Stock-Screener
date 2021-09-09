import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";
import { GET_ALL_COMPANIES } from "../../lib/graphql/queries";
import { useQuery } from "@apollo/client";
import Spinner from "../Spinner";

function SearchBar({ bg, borderRad, width, color, placeholder, height }) {
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();
  const [companies, setCompanies] = useState([]);
  const router = useRouter();

  // const getCompaniesApi = `${process.env.url}/api/companies?search`;
  const fetchCompanies = async (query) => {
    console.log("fetching Companies");
    fetch(`${process.env.url}/api/companies?search=${query}`)
      .then((response) => response.json())
      .then((data) => setCompanies(data));
  };

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

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    fetchCompanies(string);
    // console.log(string, results);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className={`${width}`}>
          <ReactSearchAutocomplete
            items={companies}
            onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            fuseOptions={{ keys: ["name", "symbol"] }}
            // onFocus={handleOnFocus}
            placeholder={
              placeholder ? placeholder : "Type Company Name or Symbol..."
            }
            autoFocus
            styling={{
              height: height ? height : "38px",
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
