import { useRouter } from "next/router";
import React, { useState } from "react";
import { MiniChart } from "../../../components/charts";
import FinancialsHeader from "../../../components/financialsHeader/FinancialsHeader";
import Layout from "../../../components/layout";
import Spinner from "../../../components/Spinner";
import {
  GET_STATEMENT_LINES,
  GET_STATEMENT_WITH_FACTS,
} from "../../../lib/graphql/queries";
import prisma from "../../../prisma/client";

export async function getServerSideProps({ params }) {
  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
  });
  const companyRatios = [];

  if (company === null) {
    const company = [];
    return { props: { company, statementLines } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: company.companyRatioId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: "Q4",
              companyId: company.id,
            },
            take: 5,
            orderBy: {
              fiscalYear: "desc",
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
  return { props: { companyRatios } };
}

function Statistics({ companyRatios }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <FinancialsHeader slug={slug} active={5} />

      <section className="xl:container mx-3 xl:mx-auto py-5 mb-3 rounded-b-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {companyRatios.map((fact) => (
            <div
              key={fact.statement.id}
              className="shadow-md p-2 bg-white dark:bg-gray-900 rounded-lg "
            >
              <h1 className="p-2 text-lg">{fact.statement.name}</h1>
              <MiniChart data={fact.facts} />
            </div>
          ))}
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
    </>
  );
}

export default Statistics;
