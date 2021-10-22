import prisma from "../../../prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";
import FinancialsHeader from "../../../components/financialsHeader/FinancialsHeader";
// import Spinner from "../../../components/Spinner";
// import { GET_STATEMENT_WITH_FACTS } from "../../../lib/graphql/queries";
// import { useQuery } from "@apollo/client";

export async function getServerSideProps({ query }) {
  const financialStatement = [];
  const company = await prisma.company.findFirst({
    where: {
      slug: query.slug,
    },
  });

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: 1,
      financialStatementLine: {
        parentId: null,
      },
    },
    include: {
      financialStatementLine: {
        include: {
          children: {
            include: {
              financialStatementFact: {
                where:
                  query.hasOwnProperty("fiscalYear") &&
                  query.hasOwnProperty("quarter") &&
                  query.hasOwnProperty("companyId")
                    ? {
                        companyId: 2,
                        fiscalYear: Number(query.fiscalYear),
                        quarter: query.quarter,
                        // fiscalYear: null,
                        // quarter: null,
                      }
                    : {
                        companyId: 2,
                        // fiscalYear: Number(query.fiscalYear),
                        // quarter: query.quarter,
                        // fiscalYear: null,
                        // quarter: null,
                      },
              },
            },
          },
          financialStatementFact: {
            where:
              query.hasOwnProperty("fiscalYear") &&
              query.hasOwnProperty("quarter") &&
              query.hasOwnProperty("companyId")
                ? {
                    companyId: 2,
                    fiscalYear: Number(query.fiscalYear),
                    quarter: query.quarter,
                  }
                : {
                    companyId: 2,
                  },
            take: 1,
            orderBy: [
              {
                quarter: "desc",
              },
              {
                fiscalYear: "desc",
              },
            ],
          },
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  // const isParent (data) {
  //   if(data.children)
  // }

  data.map((fact) => {
    financialStatement.push({
      id: fact.financialStatementLine.id,
      name: fact.financialStatementLine.name,
      children: fact.financialStatementLine.children.map((data) => ({
        id: data.id,
        name: data.name,
        financialStatementFact: data.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
        })),
      })),
      financialStatementFact:
        fact.financialStatementLine.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
        })),
    });
  });

  // Pass post data to the page via props
  return { props: { company, financialStatement, data } };
}

function FinancialReports({ company, financialStatement, data }) {
  const [quarter, setQuarter] = useState("Q4");
  const router = useRouter();
  const { slug } = router.query;
  // const data = [];
  console.log(financialStatement);
  console.log(data);

  // const { loading, error, data } = useQuery(GET_STATEMENT_WITH_FACTS, {
  //   variables: {
  //     statementId: company.balanceSheetId,
  //     quarter: quarter,
  //     companyId: company.id,
  //     take: 5,
  //   },
  // });

  // if (loading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   console.log(error);
  //   return <h1>Error...</h1>;
  // }
  // const financialStatement = [];
  return (
    <>
      <FinancialsHeader slug={slug} active={3} />
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="border-b border-gray-600 overflow-x-auto scrollable">
          <div className="grid grid-cols-5">
            <div className="col-span-3 p-2 bg-gray-700 mb-1">
              <h1>Statments</h1>
            </div>
            <div className="col-span-2 p-2 bg-gray-700 mb-1">
              <h1>Amount</h1>
            </div>
          </div>

          {financialStatement.map((fact) => (
            <div key={fact.id} className="grid grid-cols-5">
              <div className="col-span-3 bg-gray-800 p-2 mb-1">
                <h1>{fact.name}</h1>
              </div>
              {fact.financialStatementFact.length > 0 ? (
                <>
                  <div className="col-span-2 bg-gray-800 p-2 mb-1">1</div>
                </>
              ) : (
                <div className="col-span-2 bg-gray-800 p-2 mb-1">0</div>
              )}

              {fact.children.length > 0 ? (
                <>
                  <div className="col-span-3 ml-3 bg-gray-800 p-2 mb-1">
                    {fact.children.map((data) => {
                      return <h1 key={data.id}>{data.name}</h1>;
                    })}
                  </div>
                  {fact.financialStatementFact.length > 0
                    ? console.log(fact.children)
                    : console.log(fact.children)}
                </>
              ) : null}
            </div>
          ))}
        </div>
        {/* <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
            Balance Sheet
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
                <option value="Q1">Yr to Yr</option>
                <option value="Q1">Qtr to Qtr</option>
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
              <th className="p-2 text-left text-lg">
                Paritculars ( NPR. in '000 )
              </th>

              {!Array.isArray(financialStatement) ||
              !financialStatement.length ? (
                <th className="p-2 text-left text-lg">Amount</th>
              ) : (
                // <th className="p-2 text-left text-lg">Amount</th>
                financialStatement[0].financialStatementFacts.map((fact) => (
                  <th key={fact.id} className="p-2 text-left ">
                    {fact.fiscalYear}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(financialStatement) ||
            !financialStatement.length ? (
              <tr>
                <td className="p-2">No Data !!</td>
              </tr>
            ) : (
              financialStatement.map((statement) => (
                <tr
                  className="even:bg-gray-100
              dark:even:bg-gray-800 text-lg dark:hover:bg-gray-700"
                  key={statement.financialStatement.id}
                >
                  <td className="p-2">{statement.financialStatement.name}</td>
                  {statement.financialStatementFacts.map((fact) => (
                    <td className="p-2 " key={fact.id}>
                      {(fact.amount / 1000).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {fact.quarter}
                      {fact.fiscalYear}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table> */}
      </section>
    </>
  );
}

export default FinancialReports;
