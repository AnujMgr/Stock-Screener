import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FinancialsHeader from "../../../components/financialsHeader/FinancialsHeader";
import Spinner from "../../../components/Spinner";
import { GET_STATEMENT_WITH_FACTS } from "../../../lib/graphql/queries";
import prisma from "../../../prisma/client";

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
  });

  // Pass post data to the page via props
  return { props: { company } };
}

function CashFlow({ company }) {
  const [quarter, setQuarter] = useState("Q1");
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(GET_STATEMENT_WITH_FACTS, {
    variables: {
      statementId: company.profitLossId,
      quarter: quarter,
      companyId: company.id,
      take: 5,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.log(error);
    return <h1>Error...</h1>;
  }
  const financialStatement = data.getStatementWithFacts;
  return (
    <>
      <FinancialsHeader slug={slug} active={4} />

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
            Cash Flow Statement
          </h2>
          <div className="flex flex-col items-center">
            {!Array.isArray(financialStatement) ||
            !financialStatement.length ? (
              <></>
            ) : (
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
            )}
          </div>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-600 dark:bg-indigo-900 text-white">
              <th className="p-2 text-left text-lg">Paritculars</th>

              {!Array.isArray(financialStatement) ||
              !financialStatement.length ? (
                <th className="p-2 text-left ">{fact.fiscalYear}</th>
              ) : (
                <th className="p-2 text-left text-lg">Date</th>
              )}
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(financialStatement) ||
            !financialStatement.length ? (
              <tr
                className="even:bg-gray-100
          dark:even:bg-gray-800 text-lg dark:hover:bg-gray-900"
              >
                <td className="p-2">{statement.statement.name}</td>
                {statement.facts.map((fact) => (
                  <td className="p-2 ">
                    {(fact.amount / 1000).toLocaleString()}
                  </td>
                ))}
              </tr>
            ) : (
              <tr>
                <td className="p-2">No Data !!</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default CashFlow;
