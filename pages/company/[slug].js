import React from "react";
import Layout from "../../components/layout";
import { BsFillCaretUpFill } from "react-icons/bs";
import PriceChart from "../../components/charts/PriceChart";
import MiniChart from "../../components/charts/MiniChart";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/company");
  const companies = await res.json();

  const paths = companies.map((company) => ({
    params: { slug: company.slug.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res1 = await fetch(
    `http://localhost:8000/company/?slug=${params.slug}`
  );

  const companyData = await res1.json();
  const [company] = companyData;

  const res2 = await fetch(
    `http://localhost:8000/financialStatementFact?companyId=${company.id}&&quarter=4&&_limit=5`
  );
  const res3 = await fetch(`http://localhost:8000/balanceSheet`);

  const balanceSheet = await res3.json();

  const balanceSheetData = await res2.json();

  // Pass post data to the page via props
  return { props: { companyData, balanceSheetData, balanceSheet } };
}

export function Company({ companyData, balanceSheetData, balanceSheet }) {
  const [company] = companyData;
  return (
    <Layout>
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
        <h2 className="font-bold text-xl mb-4">Yearly Balance Sheet</h2>
        <div className="flex overflow-x-auto custom-scroll">
          <div className="flex flex-col flex-auto ">
            <h4 className="m-0 font-bold text-xl dark:bg-indigo-900 bg-blue-200 p-2 mb-3 text-gray-800 dark:text-gray-200">
              Particulars
            </h4>
            <div>
              {balanceSheet.map((data) => (
                <h4
                  key={data.id}
                  className="w-60  md:w-full truncate overflow-ellipsis overflow-hidden h-10 flex items-center px-2 even:bg-gray-100 dark:even:bg-gray-800 border-b border-gray-100 dark:border-gray-600 mb-1"
                >
                  {data.name}
                </h4>
              ))}
            </div>
          </div>
          {balanceSheetData.map((items) => (
            <div className="flex flex-col " key={items.fiscalYear}>
              <h4 className="m-0 px-6 font-bold text-lg bg-blue-200 dark:bg-indigo-900 p-2 mb-3 text-gray-800 dark:text-gray-200">
                {items.fiscalYear}
              </h4>
              <div>
                {items.data.map((data) => (
                  <h4
                    key={data.id}
                    className="h-10 flex items-center even:bg-gray-100 dark:even:bg-gray-800 border-b border-gray-100 dark:border-gray-600 px-6 mb-1"
                  >
                    {data.amount}
                  </h4>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md p-3 mb-3 rounded-lg">
        <h2 className="font-bold text-xl mb-4">Price Chart</h2>

        <div className="border p-1">
          <button className="">1M</button>
          <button>1M</button>
          <button>1M</button>
          <button>1M</button>
        </div>
        <br />
        <PriceChart timeSpan={30} />
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8 mb-3 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg ">
            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Company;
