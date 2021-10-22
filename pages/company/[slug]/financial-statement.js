import { useRouter } from "next/router";
import React from "react";
import Accordion from "../../../components/accordion/Accordion";
import FinancialsHeader from "../../../components/financialsHeader/FinancialsHeader";

// import Spinner from "../../../components/Spinner";
// import { GET_STATEMENT_WITH_FACTS } from "../../../lib/graphql/queries";
import prisma from "../../../prisma/client";

export async function getServerSideProps({ query }) {
  const financialStatement = [];
  const company = await prisma.company.findFirst({
    where: {
      slug: query.slug,
    },
  });

  if (
    !query.hasOwnProperty("statementType") &&
    company.hasOwnProperty("slug")
  ) {
    const data = [];
    return { props: { company, financialStatement, data } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(query.statementType),
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
                        companySlug: query.slug,
                        fiscalYear: Number(query.fiscalYear),
                        quarter: query.quarter,
                      }
                    : {
                        companySlug: query.slug,
                      },
                take: 1,
              },
            },
          },
          financialStatementFact: {
            where:
              query.hasOwnProperty("fiscalYear") &&
              query.hasOwnProperty("quarter") &&
              query.hasOwnProperty("companyId")
                ? {
                    companySlug: query.slug,
                    fiscalYear: Number(query.fiscalYear),
                    quarter: query.quarter,
                  }
                : {
                    companySlug: query.slug,
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
  // const [quarter, setQuarter] = useState("Q1");
  const router = useRouter();
  const { slug, statementType } = router.query;
  const number = ["2010/2011", "2001/2002", "2075/2076", "2080/2081"];
  console.log(financialStatement);
  return (
    <>
      <FinancialsHeader company={company} slug={slug} active={statementType} />

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="overflow-x-auto scrollable">
          <div className="flex w-full">
            <div className="flex-1 p-2 bg-blue-900 mb-1 py-3">
              <h1>Statments</h1>
            </div>
            {/* <pre>{JSON.stringify(financialStatement, undefined, 2)}</pre> */}
            {financialStatement.length > 0
              ? financialStatement[0].financialStatementFact.map((fact) => (
                  <div
                    key={fact.id}
                    className="flex-1 p-2 bg-blue-900 mb-1 py-3"
                  >
                    {fact.fiscalYear}
                  </div>
                ))
              : null}
          </div>

          {financialStatement.map((fact) => (
            <div
              key={fact.id}
              className="flex flex-col border-b border-gray-700"
            >
              {/* <pre>{JSON.stringify(fact, undefined, 2)}</pre> */}
              {fact.children.length > 0 ? (
                <Accordion fact={fact} />
              ) : (
                <div className="flex">
                  <div className="flex-1 p-2 mb-1">
                    {fact.unit == "topic" ? (
                      <h1 className="font-bold">{fact.name}</h1>
                    ) : (
                      <h1>{fact.name}</h1>
                    )}
                  </div>
                  {fact.financialStatementFact.length > 0 ? (
                    fact.financialStatementFact.map((data) => (
                      <div key={data.id} className="flex-1 p-2 mb-1 font-bold">
                        {data.amount.toLocaleString()} {data.quarter}
                      </div>
                    ))
                  ) : fact.unit == "topic" ? null : (
                    <div className="flex-1 p-2 mb-1">0</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default FinancialStatement;
