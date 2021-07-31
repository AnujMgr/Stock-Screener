import Layout from "../../../components/layout";
import { useQuery } from "@apollo/client";
import {
  GET_STATEMENT_WITH_FACTS,
  GET_STATEMENT_LINES,
} from "../../../lib/graphql/queries";
import prisma from "../../../prisma/client";

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: Number(params.slug),
    },
  });

  // Pass post data to the page via props
  return { props: { company } };
}

function FinancialReports({ company }) {
  const { loading, error, data } = useQuery(GET_STATEMENT_WITH_FACTS, {
    variables: { statementId: 1, quarter: "Q2", companyId: 1 },
  });

  const {
    data: statementLines,
    error: errorR,
    loading: loadingR,
  } = useQuery(GET_STATEMENT_LINES, {
    variables: { statementId: 1 },
  });

  if (loading || loadingR) {
    return "loading";
  }

  if (error || errorR) {
    console.log(error);
    return "error";
  }

  var factData = groupBy(data.getStatementWithFacts, "fiscalYear");

  return (
    <Layout showSecondaryNavbar={true} company={company}>
      <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 mt-8 shadow px-2 py-5 md:p-5 mb-3 rounded-lg">
        <div className="flex justify-between">
          <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
            Yearly Balance Sheet
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-blue-300 dark:border-blue-100 border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-300 cursor-pointer "
              />
            </div>
            <label
              htmlFor="toggle"
              className="text-xs text-gray-700 dark:text-gray-100 mt-2"
            >
              Simplified
            </label>
          </div>
        </div>
        <div className="flex overflow-x-auto custom-scroll">
          <div className="flex flex-col flex-auto ">
            <h4 className="m-0 font-bold text-xl dark:bg-indigo-900 bg-blue-600 p-2 mb-1 text-white dark:text-gray-200 text-left">
              Particulars
            </h4>

            {!Array.isArray(statementLines.getFinancialStatementLineById) ||
            !statementLines.getFinancialStatementLineById.length ? (
              <h4>No Data</h4>
            ) : (
              statementLines.getFinancialStatementLineById.map((data) => (
                <h3
                  key={data.id}
                  className="w-60 md:w-full truncate overflow-ellipsis overflow-hidden h-10 flex items-center px-2 even:bg-gray-100
                dark:even:bg-gray-800 mb-1"
                >
                  {data.name}
                </h3>
              ))
            )}
          </div>

          {Object.keys(factData).map(function (key, index) {
            return (
              <div className="flex flex-col" key={factData[key][0].id}>
                <h4 className="m-0 px-6 font-bold text-lg bg-blue-600 dark:bg-indigo-900 p-2 mb-1 text-white dark:text-gray-200 text-left	">
                  {factData[key][0].fiscalYear}
                </h4>
                {factData[key].map((data) => (
                  <div
                    key={data.id}
                    className="even:bg-gray-100
                  dark:even:bg-gray-800 px-2 py-2"
                  >
                    <h3 className="text-gray900 dark:text-white">
                      {data.amount.toLocaleString()}
                    </h3>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export default FinancialReports;
