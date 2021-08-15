import React from "react";
import MiniChart from "../../../components/charts/MiniChart";
import PriceChart from "../../../components/charts/PriceChart";
import Layout from "../../../components/layout";
import SecondaryNavbar from "../../../components/navbar/secondaryNavbar";

export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const data = [];
  const historicalData = [];
  // Pass post data to the page via props
  return { props: { historicalData } };
}

function Charts({ historicalData }) {
  return (
    <Layout showSecondaryNavbar={true}>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md px-3 py-3 mb-3 rounded-lg">
        <h1 className="text-2xl font-normal mb-4 px-3">Price Chart</h1>
        {/* <PriceChart priceHistory={historicalData} /> */}
      </section>
    </Layout>
  );
}

export default Charts;
