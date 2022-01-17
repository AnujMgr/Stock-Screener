import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/layout';
import SortableTable from '../../components/SortableTable';
import prisma from '../../prisma/client';
import { Field, Formik } from 'formik';
import CustomSelectField from '../../components/SelectWithSearch/CustomSelectField';

export async function getServerSideProps({ query }) {
  const screenerData = [];
  const columns = [
    {
      Header: 'Company',
      accessor: 'Company',
      className: 'table-title',
    },
    {
      Header: 'Price',
      accessor: 'Price',
    },
  ];
  const dataList = [];
  const fiscalYearList = await prisma.fiscalYears.findMany({
    orderBy: {
      fiscalYear: 'desc',
    },
  });
  // const fiscalYearList = [];

  const industries = await prisma.industry.findMany();

  const currentIndustry = await prisma.industry.findFirst({
    where: {
      slug: query.industryType ? query.industryType : 'commercial-banks',
    },
  });

  if (!currentIndustry) {
    const dataList = null;
    const columns = null;
    return { props: { columns, dataList, industries, fiscalYearList } };
  }

  const companies = await prisma.company.findMany({
    where: {
      industryId: currentIndustry.id,
    },
    include: {
      companyPrice: {
        take: 1,
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  if (companies.length < 1) {
    return { props: { columns, dataList, industries, fiscalYearList } };
  }

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: currentIndustry.screenerId,
    },
    include: {
      financialStatementLine: {
        include: {
          financialStatementFact: {
            where: {
              quarter: query.quarter ? query.quarter : '',
              fiscalYear: query.fiscalYear ? query.fiscalYear : '',
            },
            orderBy: [
              {
                quarter: 'desc',
              },
              {
                fiscalYear: 'desc',
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

  data.map((statement) => {
    if (statement.financialStatementLine.financialStatementFact.length > 0) {
      statement.financialStatementLine.financialStatementFact.map((fact) =>
        screenerData.push({
          statementId: statement.financialStatementLine.id,
          companyId: fact.companyId,
          name: statement.financialStatementLine.name,
          amount: fact.amount,
        }),
      );
    }
    columns.push({
      Header: statement.financialStatementLine.name,
      accessor: statement.financialStatementLine.name,
    });
    //
  });

  // for (let i = 0; i < 5; i++) {
  //   var firstYear = parseInt(parseInt(currentFiscalYearFact.fiscalYear.slice(-4)) - 1);
  //   var lastYear = parseInt(currentFiscalYearFact.fiscalYear.slice(-4));
  //   fiscalYearList.push(parseInt(firstYear - i) + '/' + parseInt(lastYear - i));
  // }

  companies.map((company, i) => {
    var myobj = {};
    screenerData.map((screener) => {
      if (company.id === screener.companyId) {
        Object.assign(myobj, {
          [screener.name]: screener.amount,
        });
      }
    });

    Object.assign(myobj, { ['Company']: company.name });
    Object.assign(myobj, { ['Price']: '123' });

    dataList.push(myobj);
  });

  return { props: { columns, dataList, industries, fiscalYearList } };
}

export default function Screener({ columns, dataList, industries, fiscalYearList }) {
  const router = useRouter();
  const { industry, quarter, fiscalYear } = router.query;

  const industryOptions = [];

  industries.map((industry) => industryOptions.push({ value: industry.slug, label: industry.name }));

  if (columns == null) {
    return (
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <h1>Data Not Available!</h1>
      </section>
    );
  }

  const quarterOptions = [
    { value: 'q1', label: 'Q1' },
    { value: 'q2', label: 'Q2' },
    { value: 'q3', label: 'Q3' },
    { value: 'q4', label: 'Q4' },
  ];

  const fiscalYearOptions = fiscalYearList
    ? fiscalYearList.map((data) => ({
        value: data.fiscalYear,
        label: data.fiscalYear,
      }))
    : [];

  const handleSubmission = (values) => {
    const { industry, quarter, fiscalYear } = values;
    router.push({
      pathname: `/screener`,
      query: {
        industryType: industry,
        fiscalYear: fiscalYear,
        quarter: quarter,
      },
    });
  };

  return (
    <Layout showSearch={true} showSymbol={true} title={'Screener'}>
      <section className="xl:container mt-5 mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 md:rounded-md">
        <Formik
          initialValues={{
            industry: industry ? industry : 'commercial-banks',
            quarter: quarter ? quarter : 'q4',
            fiscalYear: fiscalYear ? fiscalYear : '',
            // statement: statementType ? statementType : '1',
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
                      id="industry"
                      name="industry"
                      component={CustomSelectField}
                      options={industryOptions}
                      isMultiSelect={false}
                    />
                    <label htmlFor="industry" className="text-xs text-gray-800 dark:text-white">
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
                      id="fiscalYear"
                      name="fiscalYear"
                      component={CustomSelectField}
                      options={fiscalYearOptions}
                      isMultiSelect={false}
                    />
                    <label htmlFor="fiscalYear" className="text-xs text-gray-800 dark:text-white">
                      Fiscal Year
                    </label>
                  </div>

                  {/* <div className="mb-2 col-span-5 md:col-span-2">
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
                  </div> */}

                  <div className="mb-2 text-center md:text-left col-span-10 md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`text-white h-9 px-5 rounded  bg-blue-600
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

        {/* <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
          <div className="mb-4">
            <FormSelect
              control="select"
              label="Industry Type"
              name="Industry"
              customClassName="rounded border border-gray-600"
              value={industryOption}
              options={industryOptions}
              handleChange={(e) => {
                setIndustryOption(e.target.value);
                router.push({
                  pathname: `/screener`,
                  query: {
                    industryType: e.target.value,
                    fiscalYear: fiscalYearOption,
                    quarter: quarterOption,
                  },
                });
              }}
            />
          </div>
          <div className="mb-2 col-span-2 md:col-span-1">
            <SelectWithSearch
              customClassName="rounded border dark:border-gray-700 border-gray-400"
              options={quarterOptions}
              control="select"
              label="Quarter"
              name="quarter"
              selectedValues={quarterOption}
              handleChange={(e) => {
                setQuarterOption(e.target.value);
                router.push({
                  pathname: `/screener`,
                  query: {
                    industryType: industryOption,
                    fiscalYear: fiscalYearOption,
                    quarter: e.target.value,
                  },
                });
              }}
            />
            {/* <FormSelect
              options={quarterOptions}
              control="select"
              label="Select Quarter"
              name="quarter"
              value={quarterOption}
              customClassName="rounded border dark:border-gray-700 border-gray-400"
              handleChange={(e) => {
                setQuarterOption(e.target.value);
                router.push({
                  pathname: `/screener`,
                  query: {
                    industryType: industryOption,
                    fiscalYear: fiscalYearOption,
                    quarter: e.target.value,
                  },
                });
              }}
            /> 
          </div>
          <div className="mb-2">
            <FormSelect
              customClassName="rounded border dark:border-gray-700 border-gray-400"
              options={fiscalYearOptions}
              control="select"
              label="FiscalYear"
              name="FiscalYear"
              value={fiscalYearOption}
              handleChange={(e) => {
                setFiscalYearOption(e.target.value);
                router.push({
                  pathname: `/screener`,
                  query: {
                    industryType: industryOption,
                    fiscalYear: e.target.value,
                    quarter: quarterOption,
                  },
                });
              }}
            />
          </div>
          {/* <div className="mb-2">
          {industryOption == 0 ||
          quarterOption == 0 ||
          fiscalYearOption == 0 ? (
            <button
              disabled
              className="bg-gray-600 text-white h-9 px-5 rounded cursor-not-allowed"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={(e) =>
                router.push({
                  pathname: `/screener`,
                  query: {
                    industryType: industryOption,
                    quarter: quarterOption,
                    fiscalYear: fiscalYearOption,
                  },
                })
              }
              className="bg-blue-600 text-white h-9 px-5 rounded"
            >
              Submit
            </button>
          )}
        </div> 
        </div> */}
        <SortableTable columns={columns} data={dataList} />
      </section>
    </Layout>
  );
}
