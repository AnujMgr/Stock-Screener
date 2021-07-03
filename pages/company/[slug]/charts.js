import React from "react";
import MiniChart from "../../../components/charts/MiniChart";
import PriceChart from "../../../components/charts/PriceChart";
import Layout from "../../../components/layout";
import SecondaryNavbar from "../../../components/navbar/secondaryNavbar";

function Charts() {
  return (
    <Layout>
      <SecondaryNavbar />
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md px-3 py-5 mb-3 rounded-lg">
        <h2 className="font-bold text-2xl mb-4 px-3">Price Chart</h2>
        <PriceChart />
      </section>

      <section className="xl:container mx-3 xl:mx-auto mt-8 mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="shadow-md p-3 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="font-bold px-3 text-xl mb-3">ROE</h1>

            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <h1 className="font-bold px-3 text-xl mb-3">ROE</h1>

            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <h1 className="font-bold px-3 text-xl mb-3">ROE</h1>

            <MiniChart />
          </div>
          <div className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg">
            <h1 className="font-bold px-3 text-xl mb-3">ROE</h1>

            <MiniChart />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Charts;
