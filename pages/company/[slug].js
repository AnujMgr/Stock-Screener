import React from "react";
import { PriceChart, StockHoldingChart } from "../../components/charts";
import PriceCounter from "../../components/PriceCounter/PriceCounter";
import prisma from "../../prisma/client";
import Custom404 from "../404";

// export async function getServerSideProps({ params }) {
//   const company = await prisma.company.findFirst({
//     where: {
//       slug: params.slug,
//     },
//     include: {
//       industry: true,
//       companyStatementDetails: true,
//       stockHoldingFact: true,
//     },
//   });

//   console.log(company);

//   if (company === null) {
//     const essentials = [];
//     const priceHistory = [];
//     return { props: { company, essentials, priceHistory } };
//   }

//   const priceHistory = await prisma.companyPrice.findMany({
//     where: {
//       companySlug: params.slug,
//     },
//     orderBy: {
//       date: "desc",
//     },
//   });

//   const data = await prisma.financialStatementLineSequence.findMany({
//     where: {
//       financialStatementId: company.companyStatementDetails.companyEssentialsId,
//     },
//     include: {
//       financialStatementLine: {
//         include: {
//           financialStatementFact: {
//             where: {
//               // quarter: "Q4",
//               companyId: company.id,
//             },
//             orderBy: [
//               {
//                 quarter: "desc",
//               },
//               {
//                 fiscalYear: "desc",
//               },
//             ],
//           },
//         },
//       },
//     },
//   });

//   var essentials = [];
//   var stockHoldingData = [];

//   data.map((statement) => {
//     if (statement.financialStatementLine.financialStatementFact.length > 0)
//       essentials.push({
//         // ...fact[0],
//         sequence: statement.sequence,
//         name: statement.financialStatementLine.name,
//         amount:
//           statement.financialStatementLine.financialStatementFact[0].amount,
//         unit: statement.financialStatementLine.unit,
//       });
//   });

//   company.stockHoldingFact.map((data) =>
//     stockHoldingData.push({ name: data.name, value: data.amount })
//   );

//   // Pass post data to the page via props
//   return { props: { company, essentials, priceHistory, stockHoldingData } };
// }

export async function getStaticProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      industry: true,
      companyStatementDetails: true,
      stockHoldingFact: true,
    },
  });

  if (company === null) {
    const essentials = [];
    const priceHistory = [];
    return { props: { company, essentials, priceHistory } };
  }

  const priceHistory = await prisma.companyPrice.findMany({
    where: {
      companySlug: params.slug,
    },
    orderBy: {
      date: "desc",
    },
  });

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: company.companyStatementDetails.companyEssentialsId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              // quarter: "Q4",
              companyId: company.id,
            },
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
  });

  var essentials = [];
  var stockHoldingData = [];

  data.map((statement) => {
    if (statement.financialStatementLine.financialStatementFact.length > 0)
      essentials.push({
        // ...fact[0],
        sequence: statement.sequence,
        name: statement.financialStatementLine.name,
        amount:
          statement.financialStatementLine.financialStatementFact[0].amount,
        unit: statement.financialStatementLine.unit,
      });
  });

  company.stockHoldingFact.map((data) =>
    stockHoldingData.push({ name: data.name, value: data.amount })
  );

  // Pass post data to the page via props
  return { props: { company, essentials, priceHistory, stockHoldingData } };
}

export async function getStaticPaths() {
  const companies = await prisma.company.findMany();
  const slugs = [];

  companies.map((company) => {
    slugs.push({ params: { slug: company.slug } });
  });
  return {
    paths: slugs,
    fallback: false,
  };
}

export function Company({
  company,
  essentials,
  priceHistory,
  stockHoldingData,
}) {
  if (company === null) {
    return <Custom404 />;
  }

  return (
    <>
      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h1 className="text-2xl font-normal text-gray-900 dark:text-gray-200 mb-2">
              {company.name}
            </h1>
            <div className="flex flex-col md:flex-row">
              <p className="mr-3 text-primary text-black dark:text-white">
                NEPSE:{" "}
                <span className="text-white bg-blue-700 px-2 py-1 font-light uppercase">
                  {company.symbol}
                </span>
              </p>
              <p className="mr-3 text-primary text-black dark:text-white mt-3 md:mt-0">
                SECTOR:
                <span className="px-2 py-1 font-bold text-black dark:text-white">
                  {company.industry.name}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <p className="font-light text-gray-900 dark:text-gray-200">PRICE</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              Rs.{" "}
              {!Array.isArray(priceHistory) || !priceHistory.length
                ? "NaN"
                : priceHistory[0].closingPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </h1>
            <div className="flex">
              {!Array.isArray(priceHistory) || !priceHistory.length ? (
                <h1>Data Not Available !!</h1>
              ) : (
                <PriceCounter
                  isRising={
                    priceHistory[0].closingPrice >
                    priceHistory[0].previousClosing
                  }
                  amount={
                    Number(priceHistory[0].closingPrice) -
                    Number(priceHistory[0].previousClosing)
                  }
                  rate={(
                    ((Number(priceHistory[0].closingPrice) -
                      Number(priceHistory[0].previousClosing)) /
                      Number(priceHistory[0].closingPrice)) *
                    100
                  ).toFixed(2)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-md">
            <p className="text-lg">Rs. 100</p>
            <p className="text-gray-400 text-xs">Today's Low</p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-md">
            <p className="text-lg">Rs. 500</p>
            <p className="text-gray-400 text-xs">Today's High</p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 ">
            <p className="text-lg">385.00</p>
            <p className="text-gray-400  text-xs">52 Weeks High</p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 ">
            <p className="text-lg">205.00</p>
            <p className="text-gray-400  text-xs">52 Weeks Low </p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 ">
            <p className="text-lg">382,194.00</p>
            <p className="text-gray-400  text-xs">30-Day Avg. Volume </p>
          </div>
        </div>
      </section>

      {/* <section className="xl:container mx-3 xl:mx-auto mt-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div className="py-5 px-8 bg-white dark:bg-gray-900 shadow-md rounded-md">
            <p className="text-lg">100 - 200</p>
            <p className="text-gray-400">Market Capital</p>
          </div>
          <div className="py-5 px-8 bg-white dark:bg-gray-900 shadow-md rounded-md">
            <p className="text-lg">385.00-205.00</p>
            <p className="text-gray-400">52 Weeks High - Low </p>
          </div>
          <div className="py-5 px-8 bg-white dark:bg-gray-900 shadow-md rounded-md">
            <p className="text-lg">385.00-205.00</p>
            <p className="text-gray-400">120 Day Average </p>
          </div>
          <div className="py-5 px-8 bg-white dark:bg-gray-900 shadow-md rounded-md">
            <p className="text-lg">382,194.00</p>
            <p className="text-gray-400">30-Day Avg. Volume </p>
          </div>
        </div>
      </section> */}

      <section className="xl:container mx-3 xl:mx-auto mt-8 ">
        {/* <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
          Company Essentials
        </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="col-span-2 gap-4 bg-white dark:bg-gray-900 shadow p-5 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {!Array.isArray(essentials) || !essentials.length ? (
                <h1>Data Not Available !!</h1>
              ) : (
                essentials.map((data) => (
                  <div className="flex flex-col mb-4" key={data.name}>
                    <p className="text-md mb-2">{data.name}</p>
                    <h4 className="m-0 font-bold text-md mb-3 text-gray-800 dark:text-gray-300">
                      {data.unit === '""' || data.unit !== "Rs"
                        ? ""
                        : data.unit}{" "}
                      {data.amount.toLocaleString()}{" "}
                      {data.unit === '""' || data.unit === "Rs"
                        ? ""
                        : data.unit}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg col-span-3">
            <PriceChart priceHistory={priceHistory} />
          </div>
        </div>
      </section>

      {/* <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="font-bold px-3 text-xl mb-3">ROE %</h1>
            <MiniChart data={companyRatio[0].roe} />
          </div>
          <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="font-bold px-3 text-xl mb-3">ROA %</h1>
            <MiniChart data={companyRatio[0].roa} />
          </div>
          <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="font-bold px-3 text-xl mb-3">Net NPA %</h1>
            <MiniChart data={companyRatio[0].netNpa} />
          </div>
          <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="font-bold px-3 text-xl mb-3">NIM %</h1>
            <MiniChart data={companyRatio[0].nim} />
          </div>
        </div>
      </section> */}
      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg"></div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
              Stock Holding Pattern
            </h2>
            <StockHoldingChart data={stockHoldingData} />
          </div>
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
              Corporate Action
            </h2>

            <div className="p-3">
              <ul className="">
                <li className="pb-3">
                  The bank has a very low ROA track record. Average ROA of 3
                  years is -1.98%
                </li>
                <li className="pb-3">
                  The bank has a very low ROA track record. Average ROA of 3
                  years is -1.98%
                </li>
                <li className="pb-3">
                  The bank has a very low ROA track record. Average ROA of 3
                  years is -1.98%
                </li>
                <li className="pb-3">
                  The bank has a very low ROA track record. Average ROA of 3
                  years is -1.98%
                </li>
                <li className="pb-3">
                  The bank has a very low ROA track record. Average ROA of 3
                  years is -1.98%
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Company;
