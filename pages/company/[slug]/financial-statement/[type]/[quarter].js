import prisma from '../../../../../prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FinancialsHeader from '../../../../../components/HeaderMenu/FinancialsHeader';
import FormSelect from '../../../../../Form/FormSelect';
import FinancialTable from '../../../../../components/FinancialTable';
import { MinusIcon, PlusIcon } from '../../../../../utils/icons';
import Custom404 from '../../../../404';
import ToggleBox from '../../../../../components/ToggleBox';
import StockLayout from '../../../../../components/layout/StockLayout';

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

export async function getStaticProps({ params }) {
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

  if (params.hasOwnProperty('type'))
    switch (params.type) {
      case 'balance-sheet':
        statmentType = company.companyStatementDetails.balanceSheetId;
        break;
      case 'profit-loss':
        statmentType = company.companyStatementDetails.profitLossId;
        break;
      case 'financial-highlights':
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
                where: params.hasOwnProperty('quarter')
                  ? params.quarter === 'qtr-to-qtr'
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
                    fiscalYear: 'desc',
                  },
                  {
                    quarter: 'desc',
                  },
                ],
              },
            },
          },
          financialStatementFact: {
            where: params.hasOwnProperty('quarter')
              ? params.quarter == 'qtr-to-qtr'
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
    const columnsData = [];

    return {
      props: { company, dataList, columnsData },
    };
  }

  if (!checkStatementHasFact(data)) {
    const dataList = null;
    const columnsData = [];
    return {
      props: { company, dataList, columnsData },
    };
  }

  //This will skip topic and take first statement fact and push to columns
  data.some(function (statementline) {
    const facts = statementline.financialStatementLine.financialStatementFact;
    if (statementline.financialStatementLine.unit !== 'topic') {
      return facts.map((fact) => {
        columnsData.push({
          Header: fact.fiscalYear + ' ' + fact.quarter,
          accessor: fact.fiscalYear + ' ' + fact.quarter,
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
          [myData.fiscalYear + ' ' + myData.quarter]: myData.amount.toLocaleString(),
          particular: data.name,
          topic: data.unit,
        });
      });
    });

    fact.financialStatementLine.financialStatementFact.length > 0
      ? fact.financialStatementLine.financialStatementFact.map((data) => {
          Object.assign(myobj, {
            topic: fact.financialStatementLine.unit,
            particular: fact.financialStatementLine.name,
            [data.fiscalYear + ' ' + data.quarter]: data.amount.toLocaleString(),
            subRows: fact.financialStatementLine.children.length > 0 ? [child] : [],
          });
        })
      : Object.assign(myobj, {
          topic: fact.financialStatementLine.unit,
          particular: fact.financialStatementLine.name,
          subRows: fact.financialStatementLine.children.length > 0 ? [child] : [],
        });

    dataList.push({ ...myobj });
  });

  // Pass post data to the page via props
  return {
    props: { company, dataList, columnsData },
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
    { id: 'q1', name: 'Q1' },
    { id: 'q2', name: 'Q2' },
    { id: 'q3', name: 'Q3' },
    { id: 'q4', name: 'Q4' },
    { id: 'qtr-to-qtr', name: 'QTR To QTR' },
  ];

  companies.map((company) => {
    quarterOptions.map((quarter) => {
      paths.push({
        params: {
          slug: company.slug,
          type: 'balance-sheet',
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: 'profit-loss',
          quarter: quarter.id,
        },
      });
      paths.push({
        params: {
          slug: company.slug,
          type: 'financial-highlights',
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
  const [quarterValue, setQuarterValue] = useState(quarter ? quarter : 'qtr-to-qtr');
  const [showGraph, setShowGraph] = useState(false);

  const quarterOptions = [
    { id: 'q1', name: 'Q1' },
    { id: 'q2', name: 'Q2' },
    { id: 'q3', name: 'Q3' },
    { id: 'q4', name: 'Q4' },
    { id: 'qtr-to-qtr', name: 'Quarter To Quarter' },
  ];

  useEffect(() => {
    /* It will prevent => if quarter is Q1 in balance sheet when i click on profit and loss
     the value of quarter will also be Q1 */
    setQuarterValue(quarterValue ? quarterValue : 'qtr-to-qtr');
  }, [quarter, quarterValue]);

  if (!company) {
    return <Custom404 />;
  }
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
                backgroundColor: 'red',
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? (
              <PlusIcon width={15} customClass="fill-current dark:text-gray-400 text-gray-200" />
            ) : (
              <MinusIcon width={15} customClass="fill-current text-gray-400" />
            )}
          </span>
        ) : null;
      },
    },
    {
      Header: 'Particulars',
      accessor: 'particular',
      className: 'table-title bg-white dark:bg-gray-900 px-4 py-4 sticky left-0 ',
    },
    ...columnsData,
  ];

  console.log(dataList);
  return (
    <StockLayout>
      <FinancialsHeader
        statements={company.companyStatementDetails}
        slug={slug}
        active={type ? type : 'balance-sheet'}
      />

      <section className="xl:container mx-0 md:mx-3 xl:mx-auto bg-white dark:bg-gray-900 shadow px-2 py-2 md:p-5 mb-3 md:rounded-b-lg">
        <div className="flex justify-between w-full">
          <div className="flex flex-col mb-4 md:w-52">
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
                  pathname: `/company/${slug}/financial-statement/${type ? type : 'balance-sheet'}/${e.target.value}`,
                });
              }}
            />
          </div>

          <ToggleBox
            labelOnShow={'Hide Graph'}
            labelOnHide={'Show Graph'}
            handleChange={(e) => setShowGraph(!showGraph)}
            showGraph={showGraph}
          />
        </div>

        {dataList ? (
          <FinancialTable
            columns={columns}
            data={dataList}
            highlightTopic={true}
            minDataLength={2}
            showGraph={showGraph}
          />
        ) : (
          <h1 className="text-2xl text-center mt-5 text-gray-700 dark:text-gray-100">Sorry, Data Not available !!</h1>
        )}
      </section>
    </StockLayout>
  );
}

export default FinancialStatement;
