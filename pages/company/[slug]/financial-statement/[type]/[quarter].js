import prisma from "../../../../../prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FinancialsHeader from "../../../../../components/HeaderMenu/FinancialsHeader";
import FormSelect from "../../../../../Form/FormSelect";
import MyTable from "../../../../../components/FinancialsTable/MyTable";
import { MinusIcon, PlusIcon } from "../../../../../utils/icons";
import Custom404 from "../../../../404";

export async function getStaticProps({ params }) {
  const financialStatement = [];
  const columnsData = [];
  const dataList = [];

  const company = await prisma.company.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  var statmentType = 0;

  if (params.hasOwnProperty("type"))
    switch (params.type) {
      case "balance-sheet":
        statmentType = company.companyStatementDetails.balanceSheetId;
        break;
      case "profit-loss":
        statmentType = company.companyStatementDetails.profitLossId;
        break;
      case "financial-highlights":
        statmentType = company.companyStatementDetails.financialHighlightsId;
        break;

      default:
      // code block
    }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: Number(statmentType),
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
                where: params.hasOwnProperty("quarter")
                  ? params.quarter === "qtrToqtr"
                    ? {
                        companyId: company.id,
                      }
                    : {
                        companyId: company.id,
                        quarter: params.quarter,
                      }
                  : {
                      companyId: company.id,
                    },
                take: 5,
                orderBy: [
                  {
                    fiscalYear: "desc",
                  },
                  {
                    quarter: "desc",
                  },
                ],
              },
            },
          },
          financialStatementFact: {
            where: params.hasOwnProperty("quarter")
              ? params.quarter == "qtrToqtr"
                ? {
                    companyId: company.id,
                  }
                : {
                    companyId: company.id,
                    quarter: params.quarter,
                  }
              : {
                  companyId: company.id,
                },
            take: 5,
            orderBy: [
              {
                fiscalYear: "desc",
              },
              {
                quarter: "desc",
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
    revalidate: 10, // In seconds};
  };
}

export async function getStaticPaths() {
  const companies = await prisma.company.findMany({
    include: {
      companyStatementDetails: true,
    },
  });
  const paths = [];
  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "qtrToqtr", name: "QTR To QTR" },
  ];

  companies.map((company) => {
    quarterOptions.map((quarter) => {
      paths.push({
        params: {
          slug: company.slug,
          type: "balance-sheet",
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: "profit-loss",
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: "financial-highlights",
          quarter: quarter.id,
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}

function FinancialStatement({ company, dataList, columnsData }) {
  const router = useRouter();
  const { slug, type, quarter } = router.query;
  const [quarterValue, setQuarterValue] = useState(
    quarter ? quarter : "qtrToqtr"
  );

  console.log(quarterValue);

  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
    { id: "qtrToqtr", name: "Quarter To Quarter" },
  ];

  useEffect(() => {
    /* It will prevent => if quarter is Q1 in balance sheet when i click on profit and loss
     the value of quarter will also be Q1 */
    setQuarterValue(quarterValue ? quarterValue : "qtrToqtr");
  }, [quarter, quarterValue]);

  if (!company) {
    return <Custom404 />;
  }
  const columns = [
    {
      id: "expander", // Make sure it has an ID
      Header: "SN",

      Cell: function OrderItems({ row }) {
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row

        return row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                // We can even use the row.depth property
                // and paddingLeft to indicate the depth
                // of the row
                backgroundColor: "red",
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? (
              <PlusIcon
                width={15}
                customClass="fill-current dark:text-gray-400 text-gray-200"
              />
            ) : (
              <MinusIcon width={15} customClass="fill-current text-gray-400" />
            )}
          </span>
        ) : null;
      },
    },
    {
      Header: "Particulars",
      accessor: "particular",
      className: "table-title",
    },
    ...columnsData,
  ];
  console.log(dataList);
  return (
    <>
      <FinancialsHeader
        statements={company.companyStatementDetails}
        slug={slug}
        active={type ? type : "balance-sheet"}
      />

      <section className="xl:container mx-0 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 md:rounded-b-lg">
        <div className="mb-4 md:w-52">
          <FormSelect
            control="select"
            label="Quarter"
            name="quarter"
            customClassName="rounded border border-gray-600"
            value={quarterValue}
            options={quarterOptions}
            handleChange={(e) => {
              setQuarterValue(e.target.value);
              router.push({
                pathname: `/company/${slug}/financial-statement/${
                  type ? type : "balance-sheet"
                }/${e.target.value}`,
              });
            }}
          />
        </div>
        {dataList ? (
          <MyTable columns={columns} data={dataList} />
        ) : (
          <h1 className="text-gray-900 dark:text-gray-50">
            Data Not Available!
          </h1>
        )}
      </section>
    </>
  );
}

export default FinancialStatement;
