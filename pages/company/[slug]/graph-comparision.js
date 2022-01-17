import React, { useState } from 'react';
import prisma from '../../../prisma/client';
import { useRouter } from 'next/router';
import Custom404 from '../../404';
import FinancialTable from '../../../components/FinancialTable';
import { MinusIcon, PlusIcon } from '../../../utils/icons';
import { Field, Formik } from 'formik';
import CustomSelectField from '../../../components/SelectWithSearch/CustomSelectField';
import BarChartForComparision from '../../../components/charts/BarChartForComparision';

function checkStatementHasFact(data) {
  return data.some(function (statementline) {
    // topic don't have financialStatementFact so ignore
    // if data dont have any financialStatementFact the return empty array, no need to go further
    if (statementline.financialStatementLine.unit !== 'topic')
      if (statementline.financialStatementLine.financialStatementFact.length > 0) {
        return true;
      } else {
        return false;
      }
  });
}

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

  // If given company slug is wrong then return
  if (company === null) {
    const companies = [];
    const data = [];
    return { props: { company, companies, financialStatement, data } };
  }

  const peerCompanies = await prisma.company.findMany({
    where: {
      industryId: company.industryId,
    },
  });

  const companyIds = [];

  console.log(query);

  const companies = await prisma.company.findMany({
    where: {
      slug: query.companies
        ? typeof query.companies == 'string'
          ? { in: [query.slug, query.companies] }
          : { in: [query.slug, ...query.companies] }
        : { in: [query.slug] },
    },
  });

  companies.map((company) => companyIds.push(company.id));

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: query.hasOwnProperty('statementType')
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
                where: query.hasOwnProperty('quarter')
                  ? {
                      companyId: { in: companyIds },
                      quarter: query.quarter,
                    }
                  : {
                      companyId: { in: companyIds },
                      quarter: 'q4',
                    },
                take: companies.length,
              },
            },
          },
          financialStatementFact: {
            where: query.hasOwnProperty('quarter')
              ? {
                  companyId: { in: companyIds },
                  quarter: query.quarter,
                }
              : {
                  companyId: { in: companyIds },
                  quarter: 'Q4',
                },
            take: companies.length,
            orderBy: [
              {
                fiscalYear: 'desc',
              },
              {
                quarter: 'desc',
              },
            ],
          },
        },
      },
    },
    orderBy: {
      sequence: 'asc',
    },
  });

  if (data.length == 0) {
    const dataList = null;
    return {
      props: {
        company,
        peerCompanies,
        financialStatement,
        data,
        dataList,
        columnsData,
      },
    };
  }
  // If Statement dont have any facts
  if (!checkStatementHasFact(data)) {
    // if no. of facts is 0
    const dataList = null;
    return {
      props: {
        company,
        peerCompanies,
        financialStatement,
        data,
        dataList,
        columnsData,
      },
    };
  }

  //This will skip topic and take first statement fact and push to columns
  data.some(function (statementline) {
    const facts = statementline.financialStatementLine.financialStatementFact;
    if (statementline.financialStatementLine.unit !== 'topic') {
      return facts.map((fact) => {
        fact.companyId == company.id
          ? columnsData.unshift({
              Header: companies.find((item) => item.id === fact.companyId).name,
              accessor: fact.companyId + '' + fact.fiscalYear + ' ' + fact.quarter,
              className: 'bg-gray-200 dark:bg-gray-800 border-b dark:border-gray-700 border-white',
            })
          : columnsData.push({
              Header: companies.find((item) => item.id === fact.companyId).name,
              accessor: fact.companyId + '' + fact.fiscalYear + ' ' + fact.quarter,
            });
      });
    }
  });

  data.map((fact, i) => {
    var child = {};
    var myobj = {};
    console.log(fact);

    fact.financialStatementLine.children.map((data) => {
      console.log(data);
      data.financialStatementFact.map((myData) => {
        Object.assign(child, {
          [myData.companyId + '' + myData.fiscalYear + ' ' + myData.quarter]: myData.amount,
          particular: data.name,
          topic: data.unit,
        });
      });
    });

    fact.financialStatementLine.financialStatementFact.length > 0
      ? fact.financialStatementLine.financialStatementFact.map((data) => {
          Object.assign(myobj, {
            particular: fact.financialStatementLine.name,
            [data.companyId + '' + data.fiscalYear + ' ' + data.quarter]: data.amount,
            subRows: fact.financialStatementLine.children.length > 0 ? [child] : [],
          });
        })
      : Object.assign(myobj, {
          particular: fact.financialStatementLine.name,
          subRows: fact.financialStatementLine.children.length > 0 ? [child] : [],
        });

    dataList.push({ id: i, ...myobj, topic: fact.financialStatementLine.unit });
  });

  // Pass post data to the page via props
  return {
    props: { company, peerCompanies, dataList, columnsData, data },
  };
}

function GraphComparision({ company, peerCompanies, dataList, columnsData, data }) {
  //To Avoid React Hook "useState" is called conditionally error.
  //React Hooks must be called in the exact same order in every component render.

  const router = useRouter();
  const { slug, statementType, quarter, fiscalYear } = router.query;

  const [graphData, setGraphData] = useState([]);
  const maxFilters = 5;

  if (!company) {
    return <Custom404 />;
  }

  const companiesOptions = [];
  const financialStatementOptions = [];

  // Companies Ko id, quarter, fiscalYear, quarter

  const columns = [
    {
      id: 'expander', // Make sure it has an ID
      Header: 'SN',

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
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? (
              <MinusIcon width={18} customClass="fill-current dark:text-gray-400 text-gray-500" />
            ) : (
              <PlusIcon width={18} customClass="fill-current dark:text-gray-400 text-gray-500" />
            )}
          </span>
        ) : null;
      },
    },
    {
      Header: 'Particulars',
      accessor: 'particular',
      className: 'table-title',
    },
    ...columnsData,
  ];

  const quarterOptions = [
    { value: 'q1', label: 'Q1' },
    { value: 'q2', label: 'Q2' },
    { value: 'q3', label: 'Q3' },
    { value: 'q4', label: 'Q4' },
  ];

  if (peerCompanies)
    peerCompanies.map((comp) => {
      if (!(comp.id == company.id)) {
        companiesOptions.push({ value: comp.slug, label: comp.name });
      }
    });

  financialStatementOptions.push(
    {
      value: String(company.companyStatementDetails.balanceSheetId),
      label: 'Balance Sheet',
    },
    {
      value: String(company.companyStatementDetails.profitLossId),
      label: 'Profit And Loss',
    },
    {
      value: String(company.companyStatementDetails.financialHighlightsId),
      label: 'Finanical Highlights',
    },
    {
      value: String(company.companyStatementDetails.companyRatioId),
      label: 'Company Ratios',
    },
  );

  const handleSubmission = (values) => {
    const { quarter, companies, statement } = values;
    router.push({
      pathname: `/company/${slug}/peer-comparision`,
      query: {
        companies: companies,
        quarter: quarter,
        statementType: statement,
      },
    });
  };

  function handleChange(quarter) {
    console.log(quarter);
  }

  const handleSelection = (selectedData) => {
    if (graphData.length === 0) {
      setGraphData([selectedData]);
    } else if (graphData.some((data) => data.id === selectedData.id)) {
      const removedData = graphData.filter(function (data) {
        return data.id !== selectedData.id;
      });
      setGraphData(removedData);
      //   setGraphData(graphData.splice(index, 1));
    } else if (graphData.length < maxFilters) {
      setGraphData([selectedData, ...graphData]);
    }
  };

  console.log(graphData);

  return (
    <>
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <Formik
          initialValues={{
            companies: [],
            quarter: quarter ? quarter : 'q4',
            statement: statementType ? statementType : '1',
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              handleSubmission(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                {/* <CustomSelectField /> */}
                <div className="grid grid-cols-10 gap-3">
                  <div className="mb-2 col-span-5 md:col-span-2">
                    <Field
                      id="companies"
                      name="companies"
                      component={CustomSelectField}
                      options={companiesOptions}
                      isMultiSelect={true}
                    />
                    <label htmlFor="companies" className="text-xs text-gray-800 dark:text-white">
                      Companies
                    </label>
                  </div>
                  <div className="mb-2 col-span-5 md:col-span-2">
                    <Field
                      id="quarter"
                      name="quarter"
                      component={CustomSelectField}
                      options={quarterOptions}
                      isMultiSelect={false}
                    />
                    <label htmlFor="quarter" className="text-xs text-gray-800 dark:text-white">
                      Quarter
                    </label>
                  </div>

                  <div className="mb-2 col-span-5 md:col-span-2">
                    <Field
                      id={'statement'}
                      name="statement"
                      component={CustomSelectField}
                      options={financialStatementOptions}
                      isMultiSelect={false}
                    />
                    <label htmlFor="statement" className="text-xs text-gray-800 dark:text-white">
                      Statement Type
                    </label>
                  </div>

                  <div className="mb-2 text-center md:text-left col-span-10 md:col-span-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white h-9 px-5 rounded"
                      disabled={isSubmitting}
                      className={`text-white h-9 px-5 rounded 
                      ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-600'}`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className="flex gap-3 p-2">
          <button
            className={`${
              quarter ? 'bg-blue-900 dark:bg-gray-700 dark:hover:bg-gray-800  text-white' : 'dark:hover:bg-gray-800'
            } px-2 py-1 rounded`}
            onClick={(e) => handleChange(true)}
          >
            Figures
          </button>
          <button
            className={`${
              quarter ? 'dark:hover:bg-gray-800' : 'bg-blue-900 dark:bg-gray-700 dark:hover:bg-gray-800 text-white'
            } px-2 py-1 rounded`}
            onClick={(e) => handleChange(false)}
          >
            Graph
          </button>
        </div>

        <BarChartForComparision />

        <h1 className="text-center text-xl mt-5 mb-5">Filters</h1>

        <div className="flex flex-wrap gap-2">
          {dataList.map((data) => (
            <CustomFilter
              key={data.particular}
              data={data}
              handleClick={handleSelection}
              selectedData={graphData}
              maxFilters={maxFilters}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function CustomFilter({ data, handleClick, selectedData, maxFilters }) {
  const [isActive, setActive] = useState(false);
  return (
    <div
      className={`py-2.5 px-4 rounded-full flex-auto max-w-xs text-center cursor-pointer select-none 
      ${
        isActive
          ? 'bg-blue-700 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-500 ease-in-out'
      }`}
      onClick={(e) => {
        selectedData.length < maxFilters ? setActive(!isActive) : setActive(false);
        handleClick(data);
      }}
    >
      <h1>{data.particular}</h1>
    </div>
  );
}

export default GraphComparision;
