import React, { useContext, useEffect } from "react";
import Layout from "../../components/layout";
import { BsFillCaretUpFill } from "react-icons/bs";
import { MiniChart, StockHoldingChart } from "../../components/charts";
import SecondaryNavbar from "../../components/navbar/secondaryNavbar";

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      industry: true,
    },
  });

  // Pass post data to the page via props
  return { props: { company } };
}

export function Company({ company }) {
  return (
    <Layout showSecondaryNavbar={true} company={company}>
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
              8,099.50
            </h1>
            <div className="flex">
              <BsFillCaretUpFill color="#48bb78" size="20" />
              <p className="text-green-500 ml-2">22.22 %</p>
            </div>
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

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow p-3 rounded-lg">
        <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
          Company Essentials
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <p className="text-xs mb-2">Capital </p>
            <h4 className="m-0 font-bold text-md mb-3 text-gray-800 dark:text-gray-300">
              100
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">Capital </p>
            <h4 className="m-0 font-bold text-md mb-3 text-gray-800 dark:text-gray-300">
              100
            </h4>
          </div>
          {/* {companyEssentials.data.map((data) => (
            <div className="flex flex-col" key={data.name}>
              <p className="text-xs mb-2">{data.name}</p>
              <h4 className="m-0 font-bold text-md mb-3 text-gray-800 dark:text-gray-300">
                {data.value.toLocaleString()}
              </h4>
            </div>
          ))} */}
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
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
          </div> */}
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
              Stock Holding Pattern
            </h2>
            <StockHoldingChart />
          </div>
          <div className="bg-white dark:bg-gray-900 shadow p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-200">
              Corporate Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-900 dark:text-gray-200">sdfs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Company;
