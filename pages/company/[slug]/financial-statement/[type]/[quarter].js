import prisma from "../../../../../prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import FinancialsHeader from "../../../../../components/financialsHeader/FinancialsHeader";
import FormSelect from "../../../../../Form/FormSelect";
import ReactTooltip from "react-tooltip";

export async function getStaticProps({ params }) {
  const financialStatement = [];
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  var statmentType = 0;

  if (params.hasOwnProperty("type"))
    switch (params.type) {
      case "balance-sheet":
        statmentType = company.companyStatementDetails.balanceSheetId;
        break;
      case "profit-loss":
        statmentType = company.companyStatementDetails.profitLossId;
        break;
      case "financial-highlights":
        statmentType = company.companyStatementDetails.financialHighlightsId;
        break;

      default:
      // code block
    }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(statmentType),
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
                where: params.hasOwnProperty("quarter")
                  ? params.quarter === "qtrToqtr"
                    ? {
                        companyId: company.id,
                      }
                    : {
                        companyId: company.id,
                        quarter: params.quarter,
                      }
                  : {
                      companyId: company.id,
                    },
                take: 5,
              },
            },
          },
          financialStatementFact: {
            where: params.hasOwnProperty("quarter")
              ? params.quarter == "qtrToqtr"
                ? {
                    companyId: company.id,
                  }
                : {
                    companyId: company.id,
                    quarter: params.quarter,
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

export async function getStaticPaths() {
  const companies = await prisma.company.findMany({
    include: {
      companyStatementDetails: true,
    },
  });
  const paths = [];
  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "qtrToqtr", name: "QTR To QTR" },
  ];

  companies.map((company) => {
    quarterOptions.map((quarter) => {
      paths.push({
        params: {
          slug: company.slug,
          type: "balance-sheet",
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: "profit-loss",
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: "financial-highlights",
          quarter: quarter.id,
        },
      });
    });
  });

  console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
}

function ProfitAndLoss({ company, financialStatement, data }) {
  const router = useRouter();
  const { slug, statementType, quarter } = router.query;
  const [quarterValue, setQuarterValue] = useState(
    quarter ? quarter : "qtrToqtr"
  );

  const quarterOptions = [
    { id: "qtrToqtr", name: "Quarter To Quarter" },
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Year To Year (Q4)" },
  ];
  return (
    <>
      <FinancialsHeader
        statements={company.companyStatementDetails}
        slug={slug}
        active={
          statementType
            ? statementType
            : company.companyStatementDetails.balanceSheetId
        }
      />

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="mb-4 max-w-xs">
          <FormSelect
            control="select"
            label="Quarter"
            name="quarter"
            value={quarterValue}
            options={quarterOptions}
            handleChange={(e) => {
              setQuarterValue(e.target.value);
              router.push({
                pathname: `/company/${slug}/financial-statement/${
                  statementType ? statementType : "balance-sheet"
                }/${e.target.value}`,
              });
            }}
          />
        </div>
        <div className="overflow-x-auto scrollable">
          <div className="flex w-full">
            <div className="flex-1 p-2 bg-blue-100 dark:bg-blue-900 mb-1 py-3">
              <h1>Statments</h1>
            </div>
            {/* <pre>{JSON.stringify(financialStatement, undefined, 2)}</pre> */}
            {financialStatement.length > 0
              ? financialStatement[1].financialStatementFact.map((fact) => (
                  <div
                    key={fact.id}
                    className="flex-1 p-2 bg-blue-100 dark:bg-blue-900 mb-1 py-3"
                  >
                    {fact.fiscalYear}
                    {"  "} {fact.quarter}
                  </div>
                ))
              : null}
          </div>

          {financialStatement.map((fact) => (
            <div
              key={fact.id}
              className="flex flex-col border-b border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100"
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
                      </h1>
                    )}
                    <ReactTooltip id="registerTip" place="top" effect="solid">
                      Tooltip for the register button
                    </ReactTooltip>
                  </div>
                  {fact.financialStatementFact.length > 0 ? (
                    fact.financialStatementFact.map((data) => (
                      <div key={data.id} className="flex-1 p-2 mb-1 font-bold">
                        {data.amount.toLocaleString()}
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

export default ProfitAndLoss;
