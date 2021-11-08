import React from "react";
import ReactTooltip from "react-tooltip";
import { PriceChart, StockHoldingChart } from "../../components/charts";
import PriceCounter from "../../components/PriceCounter/PriceCounter";
import SortableTable from "../../components/SortableTable";
import { InfoIcon } from "../../lib/icons/Icons";
import prisma from "../../prisma/client";
import Custom404 from "../404";

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
    return {
      props: { company, essentials, priceHistory },
      revalidate: 10, // In seconds};
    };
  }

  const priceHistory = await prisma.companyPrice.findMany({
    where: {
      companySlug: params.slug,
    },
    orderBy: {
      date: "desc",
    },
  });
  const companyIds = [];

  const companies = await prisma.company.findMany({
    where: {
      industryId: company.industryId,
    },
    take: 6,
    include: {
      companyPrice: {
        take: 1,
        orderBy: {
          date: "desc",
        },
      },
    },
  });
  companies.map((company) => companyIds.push(company.id));

  const companyEssentials =
    await prisma.financialStatementLineSequence.findMany({
      where: {
        financialStatementId:
          company.companyStatementDetails.companyEssentialsId,
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

  //For Company Essentials
  companyEssentials.map((statement) => {
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
  // For Peer Comparisions
  const peerComparisionData =
    await prisma.financialStatementLineSequence.findMany({
      where: {
        financialStatementId: company.companyStatementDetails.companyRatioId,
      },
      include: {
        financialStatementLine: {
          include: {
            financialStatementFact: {
              where: {
                companyId: { in: companyIds },
                quarter: params.quarter,
                fiscalYear: params.fiscalYear,
              },
              take: companies.length,
            },
          },
        },
      },
      orderBy: {
        sequence: "asc",
      },
    });

  const dataList = [];
  const columnsData = [];

  peerComparisionData.map((fact) => {
    var myobj = {};
    Object.assign(myobj, {
      Header: fact.financialStatementLine.name,
      accessor: fact.financialStatementLine.name,
    });
    columnsData.push({ ...myobj });
  });

  companies.map((comp) => {
    var myObj = {};
    Object.assign(myObj, {
      company: comp.name,
      price:
        comp.companyPrice.length > 0
          ? comp.companyPrice[0].closingPrice
          : "NaN",
    });

    peerComparisionData.map((peerData) => {
      peerData.financialStatementLine.financialStatementFact.map((fact) => {
        if (comp.id == fact.companyId) {
          if (company.id == comp.id) {
            Object.assign(myObj, {
              [peerData.financialStatementLine.name]: 1234,
            });
          } else {
            Object.assign(myObj, {
              [peerData.financialStatementLine.name]: fact.amount,
            });
          }
        }
      });
    });
    dataList.push({ ...myObj });
  });

  // Pass post data to the page via props
  return {
    props: {
      company,
      essentials,
      priceHistory,
      stockHoldingData,
      dataList,
      columnsData,
    },
  };
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
  dataList,
  columnsData,
}) {
  if (!company) {
    return <Custom404 />;
  }

  const columns = [
    {
      Header: "Company",
      accessor: "company",
      className: "md:w-40	font-bold",
    },
    {
      Header: "Price",
      accessor: "price",
    },

    ...columnsData,
  ];

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
                <span className="text-white bg-blue-700 px-2 py-1 font-light uppercase rounded-sm">
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
            <>
              {!Array.isArray(priceHistory) || !priceHistory.length ? (
                <PriceCounter isRising={false} amount="321" rate="2.1" />
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
            </>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-lg">Rs. 100</p>
            <p className="text-gray-400 text-xs">Today&apos;s Low</p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-lg">Rs. 500</p>
            <p className="text-gray-400 text-xs">Today&apos;s High</p>
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

      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
          Price History
        </h2>

        <div className="grid grid-cols-1">
          <PriceChart priceHistory={priceHistory} />

          <h6 className="text-center mt-4">View Full Chart</h6>
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 ">
          <div className=" gap-4 bg-white dark:bg-gray-900 shadow p-3 rounded-lg mb-4 lg:mb-0">
            {/* <div className="col-span-3 md:col-span-3 gap-4 bg-white dark:bg-gray-900 shadow p-3 rounded-lg mb-4 lg:mb-0"> */}
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
              Company Essentials
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {!Array.isArray(essentials) || !essentials.length ? (
                <h1>Data Not Available !!</h1>
              ) : (
                essentials.map((data) => (
                  <div className="flex flex-col mb-2" key={data.name}>
                    <p className="text-md mb-2 flex items-baseline">
                      {data.name}{" "}
                      <span
                        className="ml-2 relative"
                        data-tip
                        data-for="registerTip"
                      >
                        <InfoIcon
                          customClass={
                            "fill-current dark:text-gray-600 text-gray-400"
                          }
                          height={14}
                          width={14}
                        />
                      </span>
                    </p>
                    <ReactTooltip
                      id="registerTip"
                      place="top"
                      effect="solid"
                      backgroundColor="#374151"
                      className="max-w-xs rounded-lg shadow-md"
                    >
                      Market capitalization is the aggregate valuation of the
                      company based on its current share price and the total
                      number of outstanding shares.
                    </ReactTooltip>
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
          {/* <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg col-span-3">
            <PriceChart priceHistory={priceHistory} />
          </div> */}
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
          Peer Comparision
        </h2>
        <SortableTable columns={columns} data={dataList} />
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
