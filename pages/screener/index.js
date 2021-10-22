import React, { useState } from "react";
import DataTable from "../../components/dataTable";
import Spinner from "../../components/Spinner";
import {
  GET_COMPANY_BY_INDUSTRY,
  GET_COMPANY_BY_INDUSTRY_WITH_PRICE,
  GET_SCREENER_DATA,
  GET_STATEMENT_LINES,
} from "../../lib/graphql/queries";
import { useQuery } from "@apollo/client";

export async function getServerSideProps({ params }) {
  const industries = await prisma.industry.findMany({});
  // Pass post data to the page via props
  return { props: { industries } };
}

function Screener({ industries }) {
  const [quarter, setQuarter] = useState("Q4");
  const [fiscalYear, setFiscalYear] = useState("2021");
  const [industry, setIndustry] = useState(1);
  // const { companies } = useAppContext();
  const {
    loading,
    error,
    data: facts,
  } = useQuery(GET_SCREENER_DATA, {
    variables: {
      id: 4, // This should be screener statement id i.e stored in industry
      quarter: quarter,
      fiscalYear: 2021,
    },
  });

  const {
    loading: loading2,
    error: error2,
    data: companies,
  } = useQuery(GET_COMPANY_BY_INDUSTRY_WITH_PRICE, {
    variables: {
      id: industry, // This should be screener statement id i.e stored in industry
    },
  });

  if (loading || loading2) {
    return <Spinner />;
  }

  if (error) {
    return <h1>Error</h1>;
  }
  if (error2) {
    return <h1>Error2</h1>;
  }

  var dataList = [];

  companies.getCompanyByIndustryWithPrice.map((company) =>
    dataList.push({
      id: company.id,
      company: company.name,
      price: company.closingPrice,
    })
  );

  dataList.map((data, ind) => {
    facts.getScreenerData.screenerFacts.map((screener) => {
      if (data.id.toString() === screener.companyId) {
        Object.assign(dataList[ind], {
          [screener.statementId]: screener.amount,
        });
      }
    });
  });

  return (
    <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow-md rounded-lg ">
      <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
        Screener
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col mr-4 text-left">
            <select
              name="quarters"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value={0}>All Sectors</option>
              {industries.map((industry) => (
                <option value={industry.id} key={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-400 my-1">Sectors</span>
          </div>
          <div className="flex flex-col mr-4">
            <select
              name="quarters"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <span className="text-xs text-gray-400 my-1">Quarter</span>
          </div>
          <div className="flex flex-col">
            <select
              name="fiscalYear"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value="2021">2021</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <span className="text-xs text-gray-400 my-1">Fiscal Year</span>
          </div>
        </div>
      </div>

      <DataTable
        dataList={dataList}
        statements={facts.getScreenerData.statementLines}
      />
    </section>
  );
}

export default Screener;
