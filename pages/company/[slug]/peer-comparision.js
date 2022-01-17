import React from 'react';
import Link from 'next/link';
import prisma from '../../../prisma/client';
import { useRouter } from 'next/router';
import Custom404 from '../../404';
import FinancialTable from '../../../components/FinancialTable';
import { MinusIcon, PlusIcon } from '../../../utils/icons';
import { Field, Formik } from 'formik';
import CustomSelectField from '../../../components/SelectWithSearch/CustomSelectField';
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

  const fiscalYearList = await prisma.fiscalYears.findMany({
    orderBy: {
      fiscalYear: 'desc',
    },
  });

  const financialStatement = [];
  const columnsData = [];
  const dataList = [];

  // If given company slug is wrong then return
  if (company === null) {
    const companies = [];
    const data = [];
    return { props: { company, companies, financialStatement, data, fiscalYearList } };
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
                      fiscalYear: query.fiscalYear,
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
                  fiscalYear: query.fiscalYear,
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
        fiscalYearList,
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

  data.map((fact) => {
    var child = {};
    var myobj = {};

    fact.financialStatementLine.children.map((data) => {
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

    dataList.push({ ...myobj, topic: fact.financialStatementLine.unit });
  });

  // Pass post data to the page via props
  return {
    props: { company, peerCompanies, dataList, columnsData, fiscalYearList },
  };
}

function FinancialStatement({ company, peerCompanies, fiscalYearList, dataList, columnsData }) {
  //To Avoid React Hook "useState" is called conditionally error.
  //React Hooks must be called in the exact same order in every component render.

  const router = useRouter();
  const { slug, statementType, quarter, fiscalYear } = router.query;

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

  const fiscalYearOptions = fiscalYearList
    ? fiscalYearList.map((data) => ({
        value: data.fiscalYear,
        label: data.fiscalYear,
      }))
    : [];

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
    const { quarter, companies, fiscalYear, statement } = values;
    router.push({
      pathname: `/company/${slug}/peer-comparision`,
      query: {
        companies: companies,
        quarter: quarter,
        fiscalYear: fiscalYear,
        statementType: statement,
      },
    });
  };

  return (
    <StockLayout title={company.name}>
      <section className="xl:container mx-1 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 rounded-0 md:rounded-lg mt-4">
        <Formik
          initialValues={{
            companies: [],
            quarter: quarter ? quarter : 'q4',
            fiscalYear: fiscalYear ? fiscalYear : '',
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
                      className={`text-white h-9 px-5 rounded bg-blue-600 
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
          <Link href={'/company/[slug]/peer-comparision'} as={`/company/${slug}/peer-comparision`} passHref>
            <button className="bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-800 text-white px-4 py-1 rounded">
              Figures
            </button>
          </Link>
          <Link href={'/company/[slug]/graph-comparision'} as={`/company/${slug}/graph-comparision`} passHref>
            <button className="border border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-white px-4 py-1 rounded ">
              Graph
            </button>
          </Link>
        </div>

        {dataList ? (
          <div className="grid">
            <div className="w-full overflow-hidden shadow-xs">
              <FinancialTable data={dataList} columns={columns} highlightTopic={true} />
            </div>
          </div>
        ) : (
          <h1 className="text-2xl text-center mt-5 text-gray-700 dark:text-gray-100">Sorry, Data Not available !!</h1>
        )}
      </section>
    </StockLayout>
  );
}

export default FinancialStatement;
