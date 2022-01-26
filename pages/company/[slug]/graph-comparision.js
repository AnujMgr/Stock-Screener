import React, { useState } from 'react';
import Link from 'next/link';

import prisma from '../../../prisma/client';
import { useRouter } from 'next/router';
import Custom404 from '../../404';
import { Field, Formik } from 'formik';
import CustomSelectField from '../../../components/SelectWithSearch/CustomSelectField';
import MultipleLineGraph from '../../../components/charts/MultipleLineGraph';
import StockLayout from '../../../components/layout/StockLayout';

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
  var lengthOfFacts = 0;

  // It is needed to make sure that no. of annual/quarterly data of all companies are equal not exceding 5
  async function getLengthOfData() {
    return Promise.all(
      companyIds.map(async (id) => {
        const dataLength = await prisma.financialStatementFact.count({
          where: {
            financialStatementLineId: 2,
            quarter: query.hasOwnProperty('quarter') ? query.quarter : 'q4',
            companyId: id,
          },
        });
        if (dataLength >= 5) {
          lengthOfFacts += 5;
        }
        lengthOfFacts += dataLength;
      }),
    );
  }

  await getLengthOfData();

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: query.hasOwnProperty('statementType')
        ? Number(query.statementType)
        : company.companyStatementDetails.balanceSheetId,
      // financialStatementLine: {
      //   parentId: null,
      // },
    },
    include: {
      financialStatementLine: {
        include: {
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
            take: lengthOfFacts,
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
        companies,
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
        companies,
        peerCompanies,
        financialStatement,
        data,
        dataList,
        columnsData,
      },
    };
  }

  const comparisionData = [];

  data.map((fact) => {
    const facts = [];

    fact.financialStatementLine.financialStatementFact.map((data) => {
      facts.push({
        companyName: companies.find((item) => item.id === data.companyId).name,
        fiscalYear: data.fiscalYear + ' ' + data.quarter,
        amount: data.amount,
      });
    });
    if (fact.financialStatementLine.unit !== 'topic')
      comparisionData.push({
        name: fact.financialStatementLine.name,
        facts: facts,
      });
  });

  // Pass post data to the page via props
  return {
    props: { company, peerCompanies, comparisionData, companies },
  };
}

function GraphComparision({ company, peerCompanies, comparisionData, companies }) {
  //To Avoid React Hook "useState" is called conditionally error.
  //React Hooks must be called in the exact same order in every component render.
  const router = useRouter();
  const { slug, statementType, quarter } = router.query;

  const [graphData, setGraphData] = useState([]);

  if (!company) {
    return <Custom404 />;
  }

  const companiesOptions = [];
  const financialStatementOptions = [];

  // Companies Ko id, quarter, fiscalYear, quarter

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
      pathname: `/company/${slug}/graph-comparision`,
      query: {
        companies: companies,
        quarter: quarter,
        statementType: statement,
      },
    });
  };

  // function handleChange(quarter) {
  //   router.push({
  //     pathname: `/company/${slug}/peer-comparision`,
  //     query: {
  //       companies: companies,
  //       quarter: quarter,
  //       statementType: statement,
  //     },
  //   });
  // }

  const handleSelection = (selectedData) => {
    // if (graphData.length === 0) {
    const data = [];
    const groupedData = groupByKey(selectedData.facts, 'fiscalYear');
    const keys = Object.keys(groupedData);

    keys.forEach((key, index) => {
      const obj = {};
      groupedData[key].map((data) => {
        Object.assign(obj, {
          name: selectedData.name,
          [data.companyName]: data.amount,
          fiscalYear: data.fiscalYear,
        });
      });
      data.push(obj);
    });
    setGraphData(data);
  };

  console.log(companies);

  return (
    <StockLayout title={company.name}>
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
                      disabled={isSubmitting}
                      className={`bg-blue-600 text-white h-9 px-5 rounded 
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
          <div className="flex gap-3 p-2">
            <Link href={'/company/[slug]/peer-comparision'} as={`/company/${slug}/peer-comparision`} passHref>
              <button className="border border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white px-4 py-1 rounded ">
                Figures
              </button>
            </Link>
            <Link href={'/company/[slug]/graph-comparision'} as={`/company/${slug}/graph-comparision`} passHref>
              <button className="bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-800 text-white px-4 py-1 rounded">
                Graph
              </button>
            </Link>
          </div>
        </div>

        {graphData.length > 0 && companies.length > 0 ? (
          <MultipleLineGraph companies={companies} chartData={graphData} />
        ) : null}

        <h1 className="text-center text-xl mt-5 mb-5">Filters</h1>

        {comparisionData ? (
          <div className="flex flex-wrap gap-2">
            {comparisionData.map((data) => (
              <CustomFilter
                key={data.name}
                data={data}
                handleClick={handleSelection}
                active={graphData.length !== 0 ? data.name === graphData[0].name : false}
              />
            ))}
          </div>
        ) : (
          <h1 className="text-lg text-center">Sorry !! Data not Available</h1>
        )}
      </section>
    </StockLayout>
  );
}

function groupByKey(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
  }, {});
}

function CustomFilter({ data, handleClick, active }) {
  // const [isActive, setActive] = useState(false);
  return (
    <div
      className={`py-2 px-4 rounded-full flex-auto max-w-xs text-center cursor-pointer select-none 
      ${
        active
          ? 'bg-blue-700 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-50 hover:bg-gray-300 transition duration-500 ease-in-out'
      }`}
      onClick={(e) => {
        // selectedData[0].name === data.name ? setActive(true) : setActive(false);
        handleClick(data);
      }}
    >
      <h1 className="text-xs">{data.name}</h1>
    </div>
  );
}

export default GraphComparision;
