import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { GET_ALL_COMPANIES } from "../graphql/queries";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const { loading, error, data: companies } = useQuery(GET_ALL_COMPANIES);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>Error...</h1>;
  }

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
