import React, { useState } from "react";
import DataTable from "../../components/dataTable";

export async function getServerSideProps({ params }) {
  const companies = [];
  const statements = [];
  const screenerData = [];

  const industries = await prisma.industry.findMany({});

  const data1 = await prisma.company.findMany({
    where: {
      industryId: 2,
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

  data1.map((company) => {
    if (!Array.isArray(company.companyPrice) || !company.companyPrice.length) {
      companies.push({
        id: company.id,
        name: company.name,
        symbol: company.symbol,
        closingPrice: 0,
      });
    } else {
      companies.push({
        id: company.id,
        name: company.name,
        symbol: company.symbol,
        closingPrice: company.companyPrice[0].closingPrice,
      });
    }
  });

  const data = await prisma.financialStatementLineSequence.findMany({
    where: {
      financialStatementId: 8,
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
    statements.push({
      id: statement.financialStatementLine.id,
      name: statement.financialStatementLine.name,
    });
    if (statement.financialStatementLine.financialStatementFact.length > 0)
      statement.financialStatementLine.financialStatementFact.map((fact) =>
        screenerData.push({
          statementId: statement.financialStatementLine.id,
          name: statement.financialStatementLine.name,
          companyId: fact.companyId,
          amount: fact.amount,
        })
      );
  });

  return { props: { companies, industries, statements, screenerData } };
  // Pass post data to the page via props
  // return { props: { industries } };
}

function Screener({ companies, industries, statements, screenerData }) {
  const [quarter, setQuarter] = useState("Q4");
  const [fiscalYear, setFiscalYear] = useState("2021");
  const [industry, setIndustry] = useState(1);

  var dataList = [];

  companies.map((company) =>
    dataList.push({
      id: company.id,
      company: company.name,
      price: "100",
    })
  );

  dataList.map((data, ind) => {
    screenerData.map((screener) => {
      if (data.id.toString() == screener.companyId) {
        Object.assign(dataList[ind], {
          [screener.statementId]: screener.amount,
        });
      }
    });
  });

  console.log(screenerData);
  console.log(dataList);

  return (
    <section className="xl:container mx-3 xl:mx-auto mt-8 bg-white dark:bg-gray-900 p-3 shadow-md rounded-lg ">
      <h2 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">
        Screener
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col mr-4 text-left">
            <select
              name="quarters"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value={0}>All Sectors</option>
              {industries.map((industry) => (
                <option value={industry.id} key={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-400 my-1">Sectors</span>
          </div>
          <div className="flex flex-col mr-4">
            <select
              name="quarters"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <span className="text-xs text-gray-400 my-1">Quarter</span>
          </div>
          <div className="flex flex-col">
            <select
              name="fiscalYear"
              className="p-2 bg-blue-50 dark:bg-gray-800 rounded-sm border dark:border-gray-600"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option value="2021">2021</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <span className="text-xs text-gray-400 my-1">Fiscal Year</span>
          </div>
        </div>
      </div>

      <DataTable dataList={dataList} statements={statements} />
    </section>
  );
}

export default Screener;
