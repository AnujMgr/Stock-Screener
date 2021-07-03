import React from "react";
import Layout from "../../components/layout";
import { BsFillCaretUpFill } from "react-icons/bs";
import {
  PriceChart,
  MiniChart,
  StockHoldingChart,
} from "../../components/charts";
import SecondaryNavbar from "../../components/navbar/secondaryNavbar";

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const data = await fetch(
    `http://localhost:8000/company/?slug=${params.slug}`
  );

  const companyData = await data.json();

  // Pass post data to the page via props
  return { props: { companyData } };
}

export function Company({ companyData }) {
  const [company] = companyData;
  return (
    <Layout>
      <SecondaryNavbar />
      <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow-md rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h1 className="text-2xl font-normal text-gray-900 dark:text-gray-200 mb-2">
              {company.name}
            </h1>
            <div className="flex flex-col md:flex-row">
              <p className="mr-3 text-primary text-black dark:text-white">
                NEPSE:{" "}
                <span className="text-white bg-blue-800 px-2 py-1 font-light">
                  {company.symbol}
                </span>
              </p>
              <p className="mr-3 text-primary text-black dark:text-white mt-3 md:mt-0">
                SECTOR:
                <span className=" px-2 py-1 font-bold text-black dark:text-white">
                  {company.industry.name}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="font-light">PRICE</p>
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

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md p-3 mb-3 rounded-lg">
        <h2 className="font-bold text-xl mb-4 ">Company Essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
          <div className="flex flex-col">
            <p className="text-xs mb-2">MARKET CAP</p>
            <h4 className="m-0 font-bold text-sm mb-3 text-gray-800 dark:text-gray-300">
              ₹ 29,769.66 Cr.
            </h4>
          </div>
        </div>
      </section>

      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md p-3 mb-3 rounded-lg">
        <h2 className="font-bold text-xl mb-4 ">Stock Holding Pattern</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StockHoldingChart />
          <div>
            <p>sdfs</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Company;
