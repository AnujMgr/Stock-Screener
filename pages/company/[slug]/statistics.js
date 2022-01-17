import { useRouter } from 'next/router';
import React from 'react';
import { MiniChart } from '../../../components/charts';
import FinancialsHeader from '../../../components/HeaderMenu/FinancialsHeader';
import StockLayout from '../../../components/layout/StockLayout';

import prisma from '../../../prisma/client';

export async function getStaticProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  const companyRatios = [];

  if (company === null) {
    const company = [];
    return { props: { company, statementLines } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: company.companyStatementDetails.companyRatioId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: 'q4',
              companyId: company.id,
            },
            take: 5,
            orderBy: {
              fiscalYear: 'desc',
            },
          },
        },
      },
    },
  });

  data.map((fact) => {
    companyRatios.push({
      statement: {
        id: fact.financialStatementLine.id,
        name: fact.financialStatementLine.name,
        parentId: fact.financialStatementLine.parentId,
      },
      facts: fact.financialStatementLine.financialStatementFact.map((line) => ({
        id: line.id,
        amount: line.amount,
        fiscalYear: line.fiscalYear,
      })),
    });
  });

  // Pass post data to the page via props
  return { props: { company, companyRatios } };
}

export async function getStaticPaths({ params }) {
  const companies = await prisma.company.findMany({
    include: {
      companyStatementDetails: true,
    },
  });
  const paths = [];
  companies.map((company) => {
    paths.push({
      params: {
        slug: company.slug,
      },
    });
  });
  return {
    paths: paths,
    fallback: false,
  };
}

function Statistics({ company, companyRatios }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <StockLayout>
      <FinancialsHeader statements={company.companyStatementDetails} slug={slug} active={'statistics'} />

      <section className="xl:container mx-3 xl:mx-auto py-5 mb-3 rounded-b-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {companyRatios.map((fact) => {
            return fact.facts.length > 0 ? (
              fact.facts.length == 1 ? (
                <div key={fact.statement.id} className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg ">
                  <h1 className="p-2 text-lg">{fact.statement.name}</h1>
                  {/* <MiniChart data={fact.facts} /> */}
                  <h1 className="text-4xl my-4 mx-4">{fact.facts[0].amount}</h1>
                </div>
              ) : (
                <div key={fact.statement.id} className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg ">
                  <h1 className="p-2 text-lg">{fact.statement.name}</h1>
                  <MiniChart data={fact.facts} />
                </div>
              )
            ) : (
              <div key={fact.statement.id} className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg ">
                <h1 className="p-2 text-lg">{fact.statement.name}</h1>
                <h1 key={1}>Sorry Data Not Available !</h1>
              </div>
            );
          })}
        </div>
      </section>

      {/* <section className="xl:container mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 md:p-5 mb-3 rounded-b-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg ">
            <MiniChart data={data1} />
          </div>
          <div className=" p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart data={data1} />
          </div>
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart data={data1} />
          </div>
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
            <MiniChart data={data1} />
          </div>
        </div>
      </section> */}
    </StockLayout>
  );
}

export default Statistics;
