import Layout from "../../../components/layout";
import { useQuery } from "@apollo/client";
import {
  GET_STATEMENT_WITH_FACTS,
  GET_STATEMENT_LINES,
} from "../../../lib/graphql/queries";
import prisma from "../../../prisma/client";
import Spinner from "../../../components/Spinner/Spinner";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
  });
  const financialStatement = [];

  if (company === null) {
    const company = [];
    return { props: { company, statementLines } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: company.balanceSheetId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: "Q1",
              companyId: company.id,
            },
            take: 5,
            orderBy: {
              fiscalYear: "desc",
            },
          },
        },
      },
    },
  });

  data.map((fact) => {
    financialStatement.push({
      statement: {
        id: fact.financialStatementLine.id,
        name: fact.financialStatementLine.name,
        parentId: fact.financialStatementLine.parentId,
      },
      facts: fact.financialStatementLine.financialStatementFact.map((line) => ({
        id: line.id,
        amount: line.amount,
        fiscalYear: line.fiscalYear,
      })),
    });
  });

  // Pass post data to the page via props
  return { props: { company, data, financialStatement } };
}

function FinancialReports({ company, data, financialStatement }) {
  const [quarter, setQuarter] = useState("Q1");
  console.log(financialStatement);

  const statementLines = [];

  // data.map((statement) => {
  //   // if (statementl.includes(statement.id) === false)
  //   statementl.push({
  //     id: statement.financialStatementLine.id,
  //     name: statement.financialStatementLine.name,
  //     parentId: statement.financialStatementLine.parentId,
  //     sequence: statement.sequence,
  //   });
  // });
  // console.log(statementl);

  // const { loading, error, data } = useQuery(GET_STATEMENT_WITH_FACTS, {
  //   variables: { statementId: 1, quarter: quarter, companyId: company.id },
  // });
  // console.log(statementLines);
  // const {
  //   data: statementLines,
  //   error: errorR,
  //   loading: loadingR,
  // } = useQuery(GET_STATEMENT_LINES, {
  //   variables: { statementId: 1 },
  // });

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   console.log(error);
  //   return "error";
  // }

  // var factData = groupBy(data, "fiscalYear");
  // console.log(factData);
  var factData = [];

  return (
    <Layout showSecondaryNavbar={true} company={company}>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow px-2 py-5 md:p-5 mb-3 rounded-lg">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
            Yearly Balance Sheet
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
        <div className="flex overflow-x-auto custom-scroll">
          <div className="flex flex-col flex-auto ">
            <h4 className="m-0 font-bold text-xl dark:bg-indigo-900 bg-blue-600 p-2 mb-1 text-white dark:text-gray-200 text-left">
              Particulars
            </h4>

            {!Array.isArray(statementLines) || !statementLines.length ? (
              <h4>No Data</h4>
            ) : (
              statementLines.map((data) => (
                <h3
                  key={data.id}
                  className="w-60 md:w-full truncate overflow-ellipsis overflow-hidden h-10 flex items-center px-2 even:bg-gray-100
                dark:even:bg-gray-800 mb-1"
                >
                  {data.name}
                </h3>
              ))
            )}
          </div>

          {Object.keys(factData).map(function (key, index) {
            return (
              <div className="flex flex-col" key={factData[key][0].id}>
                <h4 className="m-0 px-6 font-bold text-lg bg-blue-600 dark:bg-indigo-900 p-2 mb-1 text-white dark:text-gray-200 text-left	">
                  {factData[key][index].fiscalYear}
                </h4>
                {factData[key].map((data) => (
                  <div
                    key={data.id}
                    className="even:bg-gray-100
                  dark:even:bg-gray-800 px-2 py-2"
                  >
                    <h3 className="text-gray900 dark:text-white">
                      {data.amount.toLocaleString()}
                    </h3>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default FinancialReports;
