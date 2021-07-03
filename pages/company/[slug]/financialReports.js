import React from "react";
import Layout from "../../../components/layout";
import SecondaryNavbar from "../../../components/navbar/secondaryNavbar";

export async function getServerSideProps({ params }) {
  // Fetch data from external API
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

function FinancialReports({ balanceSheetData, balanceSheet }) {
  return (
    <Layout>
      <SecondaryNavbar />
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow-md px-2 py-5 md:p-5 mb-3 rounded-lg">
        <h2 className="font-bold text-xl mb-4">Yearly Balance Sheet</h2>
        <div className="flex overflow-x-auto custom-scroll">
          <div className="flex flex-col flex-auto ">
            <h4 className="m-0 font-bold text-xl dark:bg-indigo-900 bg-blue-600 p-2 mb-3 text-white dark:text-gray-200 ">
              Particulars
            </h4>
            <div>
              {balanceSheet.map((data) => (
                <h4
                  key={data.id}
                  className="w-60 md:w-full truncate overflow-ellipsis overflow-hidden h-10 flex items-center px-2 even:bg-gray-100 
            dark:even:bg-gray-800 mb-1"
                >
                  {data.name}
                </h4>
              ))}
            </div>
          </div>
          {balanceSheetData.map((items) => (
            <div className="flex flex-col " key={items.fiscalYear}>
              <h4 className="m-0 px-6 font-bold text-lg bg-blue-600 dark:bg-indigo-900 p-2 mb-3 text-white dark:text-gray-200">
                {items.fiscalYear}
              </h4>
              <div>
                {items.data.map((data) => (
                  <h4
                    key={data.id}
                    className="h-10 flex items-center even:bg-gray-100 dark:even:bg-gray-800 
              px-6 mb-1"
                  >
                    {data.amount}
                  </h4>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default FinancialReports;
