import { useRouter } from "next/router";
import React, { useState } from "react";
import Accordion from "../../components/accordion/Accordion";
import ReactTooltip from "react-tooltip";
import prisma from "../../prisma/client";

export async function getServerSideProps({ query }) {
  const financialStatement = [];
  const company = await prisma.company.findFirst({
    where: {
      slug: query.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });

  // if (!query.hasOwnProperty("statementType")) {
  //   const data = [];
  //   return { props: { company, financialStatement, data } };
  // }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: query.hasOwnProperty("statementType")
        ? Number(query.statementType)
        : company.companyStatementDetails.balanceSheetId,
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
                where: query.hasOwnProperty("quarter")
                  ? query.quarter === "qtrToqtr"
                    ? {
                        companyId: company.id,
                      }
                    : {
                        companyId: company.id,
                        quarter: query.quarter,
                      }
                  : {
                      companyId: company.id,
                    },
                take: 5,
              },
            },
          },
          financialStatementFact: {
            where: query.hasOwnProperty("quarter")
              ? query.quarter == "qtrToqtr"
                ? {
                    companyId: company.id,
                  }
                : {
                    companyId: company.id,
                    quarter: query.quarter,
                  }
              : {
                  companyId: company.id,
                },
            take: 5,
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
      unit: fact.financialStatementLine.unit,

      children: fact.financialStatementLine.children.map((data) => ({
        id: data.id,
        name: data.name,
        financialStatementFact: data.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
          quarter: data.quarter,
          fiscalYear: data.fiscalYear,
        })),
      })),
      financialStatementFact:
        fact.financialStatementLine.financialStatementFact.map((data) => ({
          id: data.id,
          amount: data.amount,
          quarter: data.quarter,
          fiscalYear: data.fiscalYear,
        })),
    });
  });

  // Pass post data to the page via props
  return { props: { company, financialStatement, data } };
}

function FinancialStatement({ company, financialStatement, data }) {
  const router = useRouter();
  const { quarter } = router.query;
  const [quarterValue, setQuarterValue] = useState(
    quarter ? quarter : "qtrToqtr"
  );

  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "qtrToqtr", name: "Quarter To Quarter" },
  ];
  return (
    <>
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <div className="grid">
          <div className="w-full overflow-hidden shadow-xs">
            <div className="w-full overflow-x-auto custom-scroll">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-sm font-semibold tracking-wide text-left text-gray-900 uppercase border-b dark:border-gray-700 bg-gray-100 dark:text-gray-50 dark:bg-blue-900">
                    <th className="px-4 py-4 sticky left-0 bg-gray-100 dark:bg-blue-900 dark:border-gray-700 z-30">
                      Particulars
                    </th>
                    {financialStatement.length > 0
                      ? financialStatement[1].financialStatementFact.map(
                          (fact) => (
                            <th key={fact.id} className="px-4 py-4">
                              {fact.fiscalYear} {"  "} {fact.quarter}
                            </th>
                          )
                        )
                      : null}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
                  {financialStatement.map((fact) => (
                    <tr
                      key={fact.id}
                      className="text-gray-700 dark:text-gray-50"
                    >
                      {fact.children.length > 0 ? (
                        <Accordion fact={fact} />
                      ) : (
                        <td className="px-4 py-3 sticky left-0 dark:bg-gray-900 bg-white ">
                          {fact.unit == "topic" ? (
                            <h1 className="font-bold">{fact.name}</h1>
                          ) : (
                            <h1 className="inline-flex items-center">
                              {fact.name}{" "}
                              <span
                                className="ml-3 relative"
                                data-tip
                                data-for="registerTip"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  fill="currentColor"
                                  className="bi bi-info-circle hover:block"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                              </span>
                              <ReactTooltip
                                key={fact.id}
                                id="registerTip"
                                place="top"
                                effect="solid"
                              >
                                Tooltip for the register button
                              </ReactTooltip>
                            </h1>
                          )}
                        </td>
                      )}

                      {fact.financialStatementFact.length > 0 ? (
                        fact.financialStatementFact.map((data) => (
                          <td key={data.id} className="px-4 py-3 text-sm">
                            {data.amount.toLocaleString()}
                          </td>
                        ))
                      ) : fact.unit == "topic" ? null : (
                        <div className="flex-1 p-2 mb-1">0</div>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FinancialStatement;
