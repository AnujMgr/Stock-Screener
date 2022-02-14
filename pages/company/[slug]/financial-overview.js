import prisma from '../../../prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import FinancialsHeader from '../../../components/HeaderMenu/FinancialsHeader';
import CustomBarChart from '../../../components/charts/CustomBarChart';
import StockLayout from '../../../components/layout/StockLayout';

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  const facts = [];

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: 8,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: 'q4',
              companyId: company.id,
            },
          },
        },
      },
    },
    orderBy: {
      sequence: 'asc',
    },
  });

  data.map((statement) => {
    if (statement.financialStatementLine.financialStatementFact.length > 0)
      facts.push({
        name: statement.financialStatementLine.name,
        facts: statement.financialStatementLine.financialStatementFact.map((line) => ({
          amount: line.amount,
          fiscalYear: line.fiscalYear,
        })),
      });
  });

  return { props: { facts, company } };
}

function FinancialOverview({ facts, company }) {
  const [quarter, setQuarter] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  function handleChange(quarter) {
    setQuarter(quarter);
  }
  const balanceSheetData = [];
  const profitLossData = [];

  if (Array.isArray(facts) && facts.length) {
    facts[0].facts.map((fact, index) =>
      balanceSheetData.push({
        id: index,
        fiscalYear: fact.fiscalYear,
        assets: fact.amount,
        liabilities: facts[1].facts[index].amount,
      }),
    );}

  //   facts[2].facts.map((fact, index) =>
  //     profitLossData.push({
  //       id: index,
  //       fiscalYear: fact.fiscalYear,
  //       revenue: fact.amount,
  //       netIncome: facts[3].facts[index].amount,
  //     }),
  //   );
  // }

  return (
    <StockLayout title={company.name + `'s ` + 'financial overview'}>
      <FinancialsHeader statements={company.companyStatementDetails} slug={slug} active={0} />
      <section className="xl:container mx-0 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="flex gap-3 p-2">
          <button
            className={`${
              quarter ? 'bg-blue-900 dark:bg-gray-700 dark:hover:bg-gray-800  text-white' : 'dark:hover:bg-gray-800'
            } px-2 py-1 rounded`}
            onClick={(e) => handleChange(true)}
          >
            Annual
          </button>
          <button
            className={`${
              quarter ? 'dark:hover:bg-gray-800' : 'bg-blue-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white'
            } px-2 py-1 rounded`}
            onClick={(e) => handleChange(false)}
          >
            Quarterly
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="mb-3 dark:text-gray-200 font-semibold">Income Statement</h1>
            <CustomBarChart data={balanceSheetData} dataKey1="assets" dataKey2="liabilities" height={300} />
          </div>
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg ">
            <h1 className="mb-3 dark:text-gray-200 font-semibold">Balance Sheet</h1>
            <CustomBarChart data={profitLossData} dataKey1="revenue" dataKey2="netIncome" height={300} />
          </div>
        </div>
      </section>
    </StockLayout>
  );
}

export default FinancialOverview;
