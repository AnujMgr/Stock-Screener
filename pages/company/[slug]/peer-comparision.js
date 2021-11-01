import React, { useEffect, useState } from "react";
import prisma from "../../../prisma/client";
import SelectWithSearch from "../../../components/SelectWithSearch";
import FormSelect from "../../../Form/FormSelect";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Custom404 from "../../404";
import { useAppContext } from "../../../lib/contexts/State";
import MyTable from "../../../components/FinancialsTable/MyTable";
import { MinusIcon, PlusIcon } from "../../../lib/icons/Icons";

const initialFormData = undefined;

export async function getServerSideProps({ query }) {
  // Company is Required to get company statement details
  const company = await prisma.company.findFirst({
    where: {
      slug: query.slug,
    },
    include: {
      companyStatementDetails: true,
    },
  });
  const financialStatement = [];
  const columnsData = [];
  const dataList = [];
  const fiscalYearList = [];

  // If given company slug is wrong then return
  if (company === null) {
    const companies = [];
    const data = [];
    return { props: { company, companies, financialStatement, data } };
  }

  const companyIds = [];
  const companies = await prisma.company.findMany({
    where: {
      slug: query.companies
        ? { in: [query.slug, ...query.companies, query.companies] }
        : { in: [query.slug] },
    },
  });
  companies.map((company) => companyIds.push(company.id));

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
                  ? {
                      companyId: { in: companyIds },
                      quarter: query.quarter,
                      fiscalYear: query.fiscalYear,
                    }
                  : {
                      companyId: { in: companyIds },
                      quarter: "Q4",
                    },
                take: companies.length,
              },
            },
          },
          financialStatementFact: {
            where: query.hasOwnProperty("quarter")
              ? {
                  companyId: { in: companyIds },
                  quarter: query.quarter,
                  fiscalYear: query.fiscalYear,
                }
              : {
                  companyId: { in: companyIds },
                  quarter: "Q4",
                },
            take: companies.length,
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
    // if no. of facts is 0
    const dataList = null;
    return {
      props: { company, financialStatement, data, dataList, columnsData },
    };
  }

  const currentFiscalYearFact = await prisma.financialStatementFact.findFirst({
    where: {
      companyId: Number(company.id),
    },
    orderBy: {
      fiscalYear: "desc",
    },
  });

  for (let i = 0; i < 5; i++) {
    var firstYear = parseInt(
      parseInt(currentFiscalYearFact.fiscalYear.slice(-4)) - 1
    );
    var lastYear = parseInt(currentFiscalYearFact.fiscalYear.slice(-4));
    fiscalYearList.push(parseInt(firstYear - i) + "/" + parseInt(lastYear - i));
  }

  data[1].financialStatementLine.financialStatementFact.map((fact) => {
    columnsData.push({
      Header: companies.find((item) => item.id === fact.companyId).name,
      accessor: fact.companyId + "" + fact.fiscalYear + " " + fact.quarter,
    });
  });

  data.map((fact) => {
    var child = {};
    var myobj = {};

    fact.financialStatementLine.children.map((data) => {
      data.financialStatementFact.map((myData) => {
        Object.assign(child, {
          [myData.companyId + "" + myData.fiscalYear + " " + myData.quarter]:
            myData.amount,
          particular: data.name,
        });
      });
    });

    fact.financialStatementLine.financialStatementFact.length > 0
      ? fact.financialStatementLine.financialStatementFact.map((data) => {
          Object.assign(myobj, {
            particular: fact.financialStatementLine.name,
            [data.companyId + "" + data.fiscalYear + " " + data.quarter]:
              data.amount,

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
  return { props: { company, dataList, columnsData, fiscalYearList } };
}

function FinancialStatement({
  company,
  fiscalYearList,
  dataList,
  columnsData,
}) {
  if (!company) {
    return <Custom404 />;
  }

  if (!dataList) {
    return (
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <h1>Data Not Available!</h1>
      </section>
    );
  }

  const [formData, setFormData] = useState(initialFormData);

  const { theme } = useTheme();
  const router = useRouter();
  const { slug, statementType, quarter, fiscalYear } = router.query;
  const [selectedCompanies, setSelectedCompanies] = useState("");
  const [quarterOption, setQuarterOption] = useState(quarter ? quarter : "Q4");
  const [fiscalYearOption, setFiscalYearOption] = useState(
    fiscalYear ? fiscalYear : "2020/2021"
  );
  const [statementTypeOption, setStatementTypeOption] = useState(
    statementType ? statementType : 1
  );
  const [companyOption, setCompanyOption] = useState(slug ? slug : "");

  const { companies } = useAppContext();
  const companiesOptions = [];
  const financialStatementOptions = [];

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions);
    const companies = [];
    selectedOptions.map((option) => companies.push(option.value));
    setCompanyOption(companies);
    setSelectedCompanies(selectedOptions);
  };
  // Companies Ko id, quarter, fiscalYear, quarter

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
      className: "table-title",
    },
    ...columnsData,
  ];

  const quarterOptions = [
    { id: "Q1", name: "Q1" },
    { id: "Q2", name: "Q2" },
    { id: "Q3", name: "Q3" },
    { id: "Q4", name: "Q4" },
  ];

  const fiscalYearOptions = fiscalYearList
    ? fiscalYearList.map((fiscalYear) => ({
        id: fiscalYear,
        name: fiscalYear,
      }))
    : [];

  companies.getAllCompanies.map((comp) => {
    if (!(comp.id == company.id)) {
      companiesOptions.push({ value: comp.slug, label: comp.name });
    }
  });

  financialStatementOptions.push(
    {
      id: String(company.companyStatementDetails.balanceSheetId),
      name: "Balance Sheet",
    },
    {
      id: String(company.companyStatementDetails.profitLossId),
      name: "Profit And Loss",
    },
    {
      id: String(company.companyStatementDetails.financialHighlightsId),
      name: "Finanical Highlights",
    },
    {
      id: String(company.companyStatementDetails.companyRatioId),
      name: "Company Ratios",
    }
  );

  useEffect(() => {
    setFormData(initialFormData); // To avoid errors from initial values
    // this is replacement for a network call that would load the data from a server
    var noOfStatements = [];

    setTimeout(() => {
      setFormData({
        statementType: statementType,
        companies: slug,
        fiscalYear: fiscalYearOption,
        quarter: quarter,
      });
      console.log("From Outside");
    }, 1000);
    // console.log(formData);

    // Missing dependency array here
  }, []);

  return (
    <>
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          <div className="mb-2 flex-col col-span-2 md:col-span-1">
            <SelectWithSearch
              isMulti={true}
              options={companiesOptions}
              selectedValues={selectedCompanies}
              handleChange={handleChange}
              className="rounded border "
              controlBackgroundColor={theme === "light" ? "#F3F4F6" : "#1F2937"}
              dropdownMenuBackgroundColor={
                theme === "light" ? "#F3F4F6" : "#1F2937"
              }
              hoverMenuColor={theme === "light" ? "#fff" : "#111827"}
              menuFontColor={theme === "light" ? "#000" : "#F3F4F6"}
              borderColor={theme === "light" ? "#6B7280" : "#374151"}
            />
            <span className="text-xs">Companies</span>
          </div>
          <div className="mb-2 col-span-2 md:col-span-1">
            <FormSelect
              className="rounded ring-4 ring-pink-300"
              options={quarterOptions}
              control="select"
              label="Quarter"
              name="quarter"
              value={quarterOption}
              className="rounded border dark:border-gray-700 border-gray-400"
              handleChange={(e) => setQuarterOption(e.target.value)}
            />
          </div>
          <div className="mb-2 col-span-2 md:col-span-1">
            <FormSelect
              className="rounded"
              options={fiscalYearOptions}
              control="select"
              label="FiscalYear"
              name="FiscalYear"
              value={fiscalYearOption}
              className="rounded border  dark:border-gray-700 border-gray-400"
              handleChange={(e) => setFiscalYearOption(e.target.value)}
            />
          </div>
          <div className="mb-2 col-span-2 md:col-span-1">
            <FormSelect
              className="rounded"
              options={financialStatementOptions}
              control="select"
              label="Statement"
              name="Statement"
              value={statementTypeOption}
              className="rounded border dark:border-gray-700 border-gray-400"
              handleChange={(e) => setStatementTypeOption(e.target.value)}
            />
          </div>
          <div className="mb-2 text-center md:text-left col-span-4 md:col-span-1">
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/company/${slug}/peer-comparision`,
                  query: {
                    companies: companyOption,
                    quarter: [quarterOption],
                    fiscalYear: fiscalYearOption,
                    statementType: statementTypeOption,
                  },
                })
              }
              className="bg-blue-600 text-white h-9 px-5 rounded"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid">
          <div className="w-full overflow-hidden shadow-xs">
            {/* {financialStatement[1].financialStatementFact.length > 0 ? ( */}
            {/* <FinancialsTable financialStatement={financialStatement} /> */}
            <MyTable data={dataList} columns={columns} />
            {/* ) : null} */}
          </div>
        </div>
      </section>
    </>
  );
}

export default FinancialStatement;
