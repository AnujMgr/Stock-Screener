import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      await fetch("/api/companies")
        .then((res) => res.json())
        .then(
          (result) => {
            if (result) {
              setCompanies(result);
            } else {
              setError(true);
            }
          },
          (error) => {
            setError(true);
          }
        );
    };

    fetchCompanies();
  }, []);

  let sharedState = {
    /* whatever you want */
    companies,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
