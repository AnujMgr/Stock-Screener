import React, { useState } from "react";

import DataTable from "../../components/dataTable";
import Spinner from "../../components/Spinner";
import { GET_SCREENER_DATA } from "../../lib/graphql/queries";
import { useQuery } from "@apollo/client";

export async function getServerSideProps({ params }) {
  var screenerData = [];

  const companies = await prisma.company.findMany({});
  // Pass post data to the page via props
  return { props: { companies } };
}

function Screener({ companies }) {
  const [quarter, setQuarter] = useState("Q4");
  const {
    loading,
    error,
    data: facts,
  } = useQuery(GET_SCREENER_DATA, {
    variables: {
      id: 4,
      quarter: "Q4",
      fiscalYear: 2021,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return <h1>Error</h1>;
  }

  var dataList = [];

  companies.map((company, index) =>
    dataList.push({ id: company.id, company: company.name })
  );

  dataList.map((data, ind) => {
    facts.getScreenerData.screenerFacts.map((screener, index) => {
      if (data.id.toString() === screener.companyId) {
        Object.assign(dataList[ind], {
          [screener.statementId]: screener.amount,
        });
      }
    });
  });

  return (
    <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow-md rounded-lg ">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
          Screener
        </h2>

        <div className="flex flex-col items-center">
          <select
            name="quarters"
            className="p-2"
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
          >
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
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
