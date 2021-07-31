// import { useState, createContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import { GET_COMPANY_BY_ID } from "../graphql/queries";
// import { useQuery } from "@apollo/client";

// export const CompanyContext = createContext();

// const CompanyProvider = ({ children }) => {
//   const [currentCompany, setCurrentCompany] = useState({});

//   //   const router = useRouter();
//   //   const { id } = router.query;

//   //   const { loading, error, data } = useQuery(GET_COMPANY_BY_ID, {
//   //     variables: { id: id },
//   //   });

//   //   if (loading) {
//   //     return <h1>Loading...</h1>;
//   //   }

//   //   const [userDetails, setUserDetails] = useState([]);

//   //   useEffect(() => {
//   //     setCurrentCompany(data.getCompanyById);
//   //   }, []);

//   const contextValue = {
//     currentCompany,
//     setCurrentCompany,
//   };

//   return (
//     <CompanyContext.Provider value={contextValue}>
//       {children}
//     </CompanyContext.Provider>
//   );
// };

// export default CompanyProvider;
