import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/router";

function SearchBar({
  bg,
  borderRad,
  width,
  color,
  placeholder,
  height,
  border,
}) {
  const [mounted, setMounted] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [searchString, setSearchString] = useState("");

  const { theme } = useTheme();
  const router = useRouter();

  // const getCompaniesApi = `${process.env.url}/api/companies?search`;

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

  const handleOnSearch = async (string) => {
    if (string.length > 2) {
      const res = await fetch(
        `${process.env.url}/api/companyByString?search=${string}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json;charset=UTF-8" },
        }
      );
      const data = await res.json();
      setCompanies(data);
    }
  };

  // const handleOnSearch = (string, results) => {
  //   // onSearch will have as the first callback parameter
  //   // the string searched and for the second the results.
  //   console.log(string, results);
  // };

  return (
    // <div className="App">
    // <header className="App-header">
    <div className={` ${width}`}>
      <ReactSearchAutocomplete
        items={companies}
        inputDebounce={1000}
        onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ["name", "symbol"], minMatchCharLength: 3 }}
        resultStringKeyName="name"
        // onFocus={handleOnFocus}
        borderColor="red"
        placeholder={
          placeholder ? placeholder : "Type Company Name or Symbol..."
        }
        autoFocus
        styling={{
          height: height ? height : "38px",
          backgroundColor: bg,
          hoverBackgroundColor: theme === "light" ? "#E5E7EB" : "#1F2937",
          color: color,
          zIndex: 999,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          fontFamily: "Muli",
          borderRadius: borderRad,
          border: border ? border : "",
        }}
      />
    </div>
  );
}

export default SearchBar;
