import { useRouter } from "next/router";
import React, { useState } from "react";
import SortableTable from "../../components/SortableTable";
import FormSelect from "../../Form/FormSelect";
import prisma from "../../prisma/client";

export async function getServerSideProps({ query }) {
  const screenerData = [];
  const columns = [
    {
      Header: "Company",
      accessor: "Company",
    },
    {
      Header: "Price",
      accessor: "Price",
    },
  ];
  const dataList = [];
  const industries = await prisma.industry.findMany();

  const currentIndustry = await prisma.industry.findFirst({
    where: {
      slug: query.industryType ? query.industryType : "commercial-banks",
    },
  });

  if (!currentIndustry) {
    const dataList = null;
    const columns = null;
    return { props: { columns, dataList, industries } };
  }

  const companies = await prisma.company.findMany({
    where: {
      industryId: currentIndustry.id,
    },
    include: {
      companyPrice: {
        take: 1,
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: currentIndustry.screenerId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: "Q4",
              fiscalYear: "2020/2021",
            },
            orderBy: {
              fiscalYear: "desc",
            },
          },
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  data.map((statement) => {
    if (statement.financialStatementLine.financialStatementFact.length > 0) {
      statement.financialStatementLine.financialStatementFact.map((fact) =>
        screenerData.push({
          statementId: statement.financialStatementLine.id,
          companyId: fact.companyId,
          name: statement.financialStatementLine.name,
          amount: fact.amount,
        })
      );
    }
    columns.push({
      Header: statement.financialStatementLine.name,
      accessor: statement.financialStatementLine.name,
    });
    //
  });

  companies.map((company, i) => {
    var myobj = {};
    screenerData.map((screener) => {
      if (company.id === screener.companyId) {
        Object.assign(myobj, {
          [screener.name]: screener.amount,
        });
      }
    });
    // dataList.push({ ["col1"]: company.name });
    Object.assign(myobj, { ["Company"]: company.name });
    Object.assign(myobj, { ["Price"]: "123" });

    dataList.push(myobj);
  });

  return { props: { columns, dataList, industries } };
}

export default function Screener({ columns, dataList, industries }) {
  const router = useRouter();
  const [industry, setIndustry] = useState(1);
  const industryOptions = [];

  industries.map((industry) =>
    industryOptions.push({ id: industry.slug, name: industry.name })
  );

  if (columns == null) {
    return <h1>Data Not Available!</h1>;
  }

  return (
    <section className="xl:container mt-5 mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 md:rounded-md">
      <div className="mb-4 md:w-52">
        <FormSelect
          control="select"
          label="Industry Type"
          name="quarter"
          className="rounded border border-gray-600"
          value={industry}
          options={industryOptions}
          handleChange={(e) => {
            setIndustry(e.target.value);
            router.push({
              pathname: `/screener`,
              query: {
                industryType: e.target.value,
              },
            });
          }}
        />
      </div>
      <SortableTable columns={columns} data={dataList} />
    </section>
  );
}
