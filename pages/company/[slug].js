import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { CustomAreaChart, StockHoldingChart } from '../../components/charts';
import PriceCounter from '../../components/PriceCounter/PriceCounter';
import SortableTable from '../../components/SortableTable';
import { BookMarkFillIcon, BookMarkIcon, InfoIcon } from '../../utils/icons';
import prisma from '../../prisma/client';
import Custom404 from '../404';
import Spinner from '../../components/Spinner';
import FinancialTable from '../../components/FinancialTable/FinancialTable';
import StockLayout from '../../components/layout/StockLayout';
import { useAuth } from '../../lib/contexts/AuthContext';
import axios from 'axios';

export async function getStaticProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      industry: true,
      companyStatementDetails: true,
    },
  });

  if (company === null) {
    const essentials = [];
    const priceHistory = [];
    return {
      props: { company, essentials, priceHistory },
    };
  }

  const priceHistory = await prisma.companyPrice.findMany({
    where: {
      companySlug: params.slug,
    },
    select: {
      closingPrice: true,
      tradedShares: true,
      amount: true,
      noOfTransactions: true,
      date: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  const currentPrice = await prisma.companyPrice.findFirst({
    where: {
      companySlug: params.slug,
    },

    orderBy: {
      date: 'desc',
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
          date: 'desc',
        },
      },
    },
  });
  companies.map((company) => companyIds.push(company.id));

  // Company Essentials
  const companyEssentials = await prisma.financialStatementLineSequence.findMany({
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
                quarter: 'desc',
              },
              {
                fiscalYear: 'desc',
              },
            ],
          },
        },
      },
    },
  });

  // Stock Holding Facts
  const stockholdingFacts = await prisma.actionStatementLineSequence.findMany({
    where: {
      actionStatementId: company.companyStatementDetails.stockholdingId,
    },
    include: {
      actionStatementLine: {
        include: {
          actionStatementFact: {
            where: {
              // quarter: "Q4",
              companyId: company.id,
            },
            orderBy: [
              {
                bookCloseDate: 'desc',
              },
            ],
            take: 1,
          },
        },
      },
    },
  });

  const companyActionFacts = await prisma.actionStatementLineSequence.findMany({
    where: {
      actionStatementId: company.companyStatementDetails.corporateActionId,
    },
    include: {
      actionStatementLine: {
        include: {
          actionStatementFact: {
            where: {
              companyId: company.id,
            },
            orderBy: [
              {
                bookCloseDate: 'desc',
              },
            ],
          },
        },
      },
    },
    orderBy: {
      sequence: 'asc',
    },
  });

  var essentials = [];
  var stockHoldingData = [];
  var actionDataList = [];

  const companyActionColumnData = [];
  const companyActionDataList = [];

  const dataList = [];
  const columnsData = [];

  //For Company Essentials
  companyEssentials.map((statement) => {
    if (statement.financialStatementLine.financialStatementFact.length > 0)
      essentials.push({
        // ...fact[0],
        sequence: statement.sequence,
        name: statement.financialStatementLine.name,
        amount: statement.financialStatementLine.financialStatementFact[0].amount,
        unit: statement.financialStatementLine.unit,
      });
  });
  // For Peer Comparisions
  const peerComparisionData = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: company.companyStatementDetails.companyRatioId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              companyId: { in: companyIds },
              // quarter: params.quarter,
              // fiscalYear: params.fiscalYear,
            },
            take: companies.length,
            orderBy: [
              {
                fiscalYear: 'desc',
              },
              {
                quarter: 'desc',
              },
            ],
          },
        },
      },
    },
    orderBy: {
      sequence: 'asc',
    },
  });

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
      price: comp.companyPrice.length > 0 ? comp.companyPrice[0].closingPrice : 'NaN',
    });

    peerComparisionData.map((peerData) => {
      peerData.financialStatementLine.financialStatementFact.map((fact) => {
        if (comp.id == fact.companyId) {
          if (company.id == comp.id) {
            Object.assign(myObj, {
              [peerData.financialStatementLine.name]: fact.amount,
              topic: 'topic', //This will highlight background color for current company
            });
          } else {
            Object.assign(myObj, {
              [peerData.financialStatementLine.name]: fact.amount,
              topic: null,
            });
          }
        }
      });
    });

    myObj.company == company.name ? dataList.unshift({ ...myObj }) : dataList.push({ ...myObj });
  });

  stockholdingFacts.map((holding) => {
    if (holding.actionStatementLine.actionStatementFact.length > 0) {
      holding.actionStatementLine.actionStatementFact.map((data) => {
        stockHoldingData.push({
          name: holding.actionStatementLine.name,
          value: Number(data.amount),
          // closeData: data.bookCloseDate,
        });
      });
    }
  });

  //Company Actions Data
  //Columns
  companyActionFacts.map((action) => {
    companyActionColumnData.push({
      Header: action.actionStatementLine.name,
      accessor: action.actionStatementLine.name,
    });
  });
  // DataList
  companyActionFacts.map((action) => {
    if (action.actionStatementLine.actionStatementFact.length > 0) {
      action.actionStatementLine.actionStatementFact.map((data, i) => {
        companyActionDataList.push({
          name: action.actionStatementLine.name,
          amount: data.amount.toLocaleString(),
          closeDate: data.bookCloseDate,
          // accessor: data.amount,
        });
      });
    }
  });

  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  var groupedActionData = groupByKey(companyActionDataList, 'closeDate');
  const keys = Object.keys(groupedActionData);
  // const myDataList = [];

  keys.forEach((key) => {
    var myobj = {};

    groupedActionData[key].map((data) => {
      Object.assign(myobj, {
        [data.name]: data.amount.toLocaleString(),
      });
    });
    actionDataList.push({ date: key, ...myobj });
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
      stockholdingFacts,
      companyActionColumnData,
      actionDataList,
      currentPrice,
    },
    revalidate: 10, // In seconds};
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
    fallback: 'blocking',
  };
}

export function Company({
  company,
  essentials,
  priceHistory,
  stockHoldingData,
  dataList,
  columnsData,
  companyActionColumnData,
  actionDataList,
  currentPrice,
}) {
  const router = useRouter();
  // const [state] = useAuth();



  const columns = [
    {
      Header: 'Company',
      accessor: 'company',
      className: 'md:w-40	font-bold table-title bg-white dark:bg-gray-900 px-4 py-4 sticky left-0 ',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },

    ...columnsData,
  ];

  const actionsColumn = [
    {
      Header: 'Date',
      accessor: 'date',
      className: 'md:w-40	font-bold table-title bg-white dark:bg-gray-900 px-4 py-4 sticky left-0 ',
    },

    ...companyActionColumnData,
  ];
  const [state] = useAuth();
  const { user, accessToken } = state;
  const [haswatchlistData, setHasWatchListData] = useState(false);
  const [loadingWatchList, setLoadingWatchList] = useState(false);

  const [mounted, setMounted] = useState(false); // To avoid SSR error

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // if (accessToken) {
    checkIsInWatchList({ userId: user.id, companyId: company.id });
    // }
  }, [accessToken]);

  const checkIsInWatchList = async (data) => {
    if (!accessToken) return {};
    await axios
      .get(`/api/watchlist/checkisinlist`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          userId: data.userId,
          companyId: data.companyId,
        },
      })
      .then((response) => {
        setHasWatchListData(response.data.isInWatchList);
      })
      .catch((error) => {
        console.log('Something went wrong!!');
      });
  };

  const addToWatchList = async (data) => {
    setLoadingWatchList(true);
    await axios
      .post(`/api/watchlist`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setHasWatchListData(response.data.isInList);
        setLoadingWatchList(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromWatchList = async (data) => {
    setLoadingWatchList(true);

    await axios
      .delete(`/api/watchlist`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      })
      .then((response) => {
        setHasWatchListData(response.data.isInList);
        setLoadingWatchList(false);
      })
      .catch((error) => {
        console.log('Something went wrong!!');
      });
  };

  if (!company) {
    return <Custom404 />;
  }

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <StockLayout title={company.name}>
      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 text-gray-900 dark:text-gray-50">
          <div className="mb-4">
            <h1 className="text-2xl font-normal mb-2">{company.name}</h1>
            <div className="flex flex-wrap gap-3 mt-2">
              <p>
                NEPSE:
                <span className="text-white bg-blue-700 px-2 py-1 font-light uppercase rounded-sm">
                  {company.symbol}
                </span>
              </p>
              <p>
                SECTOR:
                <span className="px-2 py-1 font-bold ">{company.industry.name}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3">
            <div className="mt-4 md:mt-0">
              <p className="font-light text-gray-900 dark:text-gray-200">PRICE</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                Rs.&nbsp;
                {currentPrice
                  ? currentPrice.closingPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  : 'NaN'}
                {/* {!Array.isArray(priceHistory) || !priceHistory.length
                  ? 'NaN'
                  : priceHistory[0].closingPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} */}
              </h1>
              <>
                {currentPrice ? (
                  <PriceCounter
                    isRising={currentPrice.closingPrice > currentPrice.previousClosing}
                    amount={Number(currentPrice.priceDifference)}
                    rate={((Number(currentPrice.priceDifference) / Number(currentPrice.closingPrice)) * 100).toFixed(2)}
                  />
                ) : null}
              </>
            </div>
            <div className="flex">
              <WatchListButton
                handleOnClick={haswatchlistData ? removeFromWatchList : addToWatchList}
                user={user}
                company={company}
                isInWatchList={haswatchlistData}
                activeWidth="group-hover:w-36"
                inactiveWidth="group-hover:w-52"
                loading={loadingWatchList}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 text-gray-900 dark:text-gray-50">
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-lg">Rs. {currentPrice ? currentPrice.minPrice : 'NaN'}</p>
            <p className="text-gray-400 text-xs">Today&apos;s Low</p>
          </div>
          <div className="pt-5 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-lg">Rs. {currentPrice ? currentPrice.maxPrice : 'NaN'}</p>
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
        <h2 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-200">Price History</h2>

        <div className="grid grid-cols-1">
          <CustomAreaChart
            data={priceHistory}
            dataKeyForArea={'closingPrice'}
            showPeriodSelector={true}
            showBush={true}
          />

          <a
            href="#"
            className="text-center py-2 px-3 mt-4 w-full sm:w-96 border hover:bg-indigo-800 dark:hover:bg-gray-800 hover:text-white 
            border-indigo-800 dark:border-gray-300 mx-auto rounded-md shadow-sm transition duration-500 ease-in-out"
          >
            View Full Chart
          </a>
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 ">
          <div className=" gap-4 bg-white dark:bg-gray-900 shadow p-3 rounded-lg mb-4 lg:mb-0 text-gray-900 dark:text-gray-50">
            {/* <div className="col-span-3 md:col-span-3 gap-4 bg-white dark:bg-gray-900 shadow p-3 rounded-lg mb-4 lg:mb-0"> */}
            <h2 className="font-semibold text-xl mt-2 mb-4">Statistics Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
              {!Array.isArray(essentials) || !essentials.length ? (
                <h1>Data Not Available !!</h1>
              ) : (
                essentials.map((data) => (
                  <div
                    className="flex justify-between align-bottom mb-2 border-b dark:border-gray-600 border-gray-300"
                    key={data.name}
                  >
                    <p className="text-md font-normal mb-2 flex items-baseline">
                      {data.name}{' '}
                      <span className="ml-2 relative" data-tip data-for="registerTip">
                        <InfoIcon
                          customClass={'fill-current text-blue-500 dark:text-gray-500'}
                          height={14}
                          width={14}
                        />
                      </span>
                    </p>
                    {mounted ? (
                      <ReactTooltip
                        id="registerTip"
                        place="top"
                        effect="solid"
                        // backgroundColor="#374151"
                        className="max-w-xs rounded-lg shadow-md bg-white"
                      >
                        Market capitalization is the aggregate valuation of the company based on its current share price
                        and the total number of outstanding shares.
                      </ReactTooltip>
                    ) : null}
                    <h4 className="m-0 font-bold text-md mb-3 text-gray-800 dark:text-gray-300">
                      {data.unit === '""' || data.unit !== 'Rs' ? '' : data.unit} {data.amount.toLocaleString()}{' '}
                      {data.unit === '""' || data.unit === 'Rs' ? '' : data.unit}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">Peer Comparision</h2>
        <SortableTable columns={columns} data={dataList} highlightTopic={true} showCheck={false} />
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow rounded-lg">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">Corporate Actions</h2>
        </div>
        <FinancialTable columns={actionsColumn} data={actionDataList} />
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">Stock Holding Pattern</h2>
            <StockHoldingChart data={stockHoldingData} />
          </div>
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">Corporate Action</h2>

            <div className="p-3">
              <ul className="">
                <li className="pb-3">The bank has a very low ROA track record. Average ROA of 3 years is -1.98%</li>
                <li className="pb-3">The bank has a very low ROA track record. Average ROA of 3 years is -1.98%</li>
                <li className="pb-3">The bank has a very low ROA track record. Average ROA of 3 years is -1.98%</li>
                <li className="pb-3">The bank has a very low ROA track record. Average ROA of 3 years is -1.98%</li>
                <li className="pb-3">The bank has a very low ROA track record. Average ROA of 3 years is -1.98%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </StockLayout>
  );
}

const WatchListButton = ({ isInWatchList, activeWidth, inactiveWidth, handleOnClick, user, company, loading }) => {
  return (
    <button
      className={`group flex w-auto px-3 border border-blue-900 text-blue-900 py-2 rounded-md hover:bg-blue-900 hover:text-white 
      ${isInWatchList ? 'bg-blue-900' : null}  ${loading ? 'cursor-not-allowed' : null}`}
      onClick={(e) => handleOnClick({ userId: user.id, companyId: company.id })}
      disabled={loading}
    >
      {isInWatchList ? (
        <BookMarkFillIcon customClass="fill-current text-white" height="24" width="20" />
      ) : (
        <BookMarkIcon
          customClass="fill-current text-blue-900 dark:text-gray-200 group-hover:text-white"
          height="24"
          width="20"
        />
      )}
      <div
        className={`w-0 overflow-hidden h-0 ${isInWatchList ? inactiveWidth : activeWidth
          } group-hover:h-auto transition-all ease-in-out duration-500 items-center`}
      >
        <span className="ml-3 whitespace-nowrap"> {isInWatchList ? 'Remove From WatchList' : 'Add to WatchList'}</span>
      </div>
    </button>
  );
};

export default Company;
