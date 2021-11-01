import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FinancialsHeader from "../../../components/FinancialsHeader";

import prisma from "../../../prisma/client";
import FormSelect from "../../../Form/FormSelect";
import Custom404 from "../../404";
import MyTable from "../../../components/FinancialsTable/MyTable";
import { PlusIcon, MinusIcon } from "../../../lib/icons/Icons";

export async function getServerSideProps({ query }) {
  const financialStatement = [];
  const columnsData = [];
  const dataList = [];

  const company = await prisma.company.findFirst({
    where: {
      slug: query.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  if (!company) {
    const company = null;
    return { props: { company, financialStatement } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: query.hasOwnProperty("statementType")
        ? Number(query.statementType)
        : company.companyStatementDetails.balanceSheetId,
      financialStatementLine: {
        parentId: null,
      },
    },
    include: {
      financialStatementLine: {
        include: {
          children: {
            include: {
              financialStatementFact: {
                where: query.hasOwnProperty("quarter")
                  ? query.quarter === "qtrToqtr"
                    ? {
                        companyId: company.id,
                      }
                    : {
                        companyId: company.id,
                        quarter: query.quarter,
                      }
                  : {
                      companyId: company.id,
                    },
                take: 5,
              },
            },
          },
          financialStatementFact: {
            where: query.hasOwnProperty("quarter")
              ? query.quarter == "qtrToqtr"
                ? {
                    companyId: company.id,
                  }
                : {
                    companyId: company.id,
                    quarter: query.quarter,
                  }
              : {
                  companyId: company.id,
                },
            take: 5,
            orderBy: [
              {
                quarter: "desc",
              },
              {
                fiscalYear: "desc",
              },
            ],
          },
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });

  if (!data.length > 0) {
    const dataList = null;
    return {
      props: { company, financialStatement, data, dataList, columnsData },
    };
  }

  if (data[1].financialStatementLine.financialStatementFact.length <= 0) {
    const dataList = null;
    return {
      props: { company, financialStatement, data, dataList, columnsData },
    };
  }

  data[1].financialStatementLine.financialStatementFact.map((fact) => {
    columnsData.push({
      Header: fact.fiscalYear + " " + fact.quarter,
      accessor: fact.fiscalYear + " " + fact.quarter,
    });
  });

  data.map((fact) => {
    var child = {};
    var myobj = {};

    fact.financialStatementLine.children.map((data) => {
      data.financialStatementFact.map((myData) => {
        Object.assign(child, {
          [myData.fiscalYear + " " + myData.quarter]: myData.amount,
          particular: data.name,
        });
      });
    });

    fact.financialStatementLine.financialStatementFact.length > 0
      ? fact.financialStatementLine.financialStatementFact.map((data) => {
          Object.assign(myobj, {
            particular: fact.financialStatementLine.name,
            [data.fiscalYear + " " + data.quarter]: data.amount,
            subRows:
              fact.financialStatementLine.children.length > 0 ? [child] : [],
          });
        })
      : Object.assign(myobj, {
          particular: fact.financialStatementLine.name,
          subRows:
            fact.financialStatementLine.children.length > 0 ? [child] : [],
        });

    dataList.push({ ...myobj });
  });

  // Pass post data to the page via props
  return {
    props: { company, financialStatement, data, dataList, columnsData },
  };
}

function FinancialStatement({ company, dataList, columnsData, data }) {
  const router = useRouter();
  const { slug, statementType, quarter } = router.query;
  const [quarterValue, setQuarterValue] = useState(
    quarter || quarter != undefined ? quarter : "qtrToqtr"
  );
  console.log(data);

  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "qtrToqtr", name: "Quarter To Quarter" },
  ];
  if (!company) {
    return <Custom404 />;
  }

  const columns = [
    {
      id: "expander", // Make sure it has an ID
      Header: "SN",

      Cell: ({ row }) =>
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row
        row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                // We can even use the row.depth property
                // and paddingLeft to indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? <PlusIcon /> : <MinusIcon />}
          </span>
        ) : null,
    },
    {
      Header: "Particulars",
      accessor: "particular",
    },
    ...columnsData,
  ];

  useEffect(() => {
    return () => {
      setQuarterValue(quarter || quarter != undefined ? quarter : "qtrToqtr");
    };
  }, [statementType]);

  console.log(columns);

  return (
    <>
      <FinancialsHeader
        statements={company.companyStatementDetails}
        slug={slug}
        active={
          statementType
            ? statementType
            : company.companyStatementDetails.balanceSheetId
        }
      />

      <section className="xl:container mx-0 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 md:rounded-b-lg">
        <div className="mb-4 md:w-52">
          <FormSelect
            control="select"
            label="Quarter"
            name="quarter"
            className="rounded border border-gray-600"
            value={quarterValue}
            options={quarterOptions}
            handleChange={(e) => {
              setQuarterValue(e.target.value);
              router.push({
                pathname: `/company/${slug}/financial-statement`,
                query: {
                  statementType: statementType
                    ? statementType
                    : company.companyStatementDetails.balanceSheetId,
                  quarter: e.target.value,
                },
              });
            }}
          />
        </div>
        {dataList ? (
          <MyTable columns={columns} data={dataList} />
        ) : (
          <h1>Data Not Available!</h1>
        )}
      </section>
    </>
  );
}

export default FinancialStatement;
