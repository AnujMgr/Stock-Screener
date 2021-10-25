const industries = [
  {
    name: "Commercial Banks",
    slug: "commercial-banks",
    screenerId: 1,
  },
  {
    name: "Development Banks",
    slug: "development-banks",
    screenerId: 2,
  },
];

const companyStatmentDetails = [
  {
    name: "For Commercial Banks",
    balanceSheetId: 1,
    profitLossId: 2,
    financialHighlightsId: 3,
    companyRatioId: 4,
    companyEssentialsId: 5,
    companyActionId: 8,
    financialStatementOverview: 8,
  },
];

const companies = [
  {
    name: "Nabil Bank",
    slug: "nabil",
    symbol: "NABIL",
    description: "",
    industryId: 2,
    statementsId: 1,
  },
];

const financialStatement = [
  {
    name: "Balance Sheet for Commercial Banks",
    slug: "balance-sheet-for-commercial-banks",
  },
  {
    name: "Profit And Loss for Commercial Banks",
    slug: "profit-loss-for-commercial-banks",
  },
  {
    name: "Financial Highlights for Commercial Banks",
    slug: "financial-highlights-for-commercial-banks",
  },
  {
    name: "Ratios For Commercial Banks",
    slug: "ratios-for-commercial-banks",
  },
  {
    name: "Company Essentials for Commercial Banks",
    slug: "company-essentials-for-commercial-banks",
  },
  {
    name: "Company Actions",
    slug: "company-actions",
  },
  {
    name: "Financial Statement overview for Commercial Banks",
    slug: "financial-statement-overview-for-commercial-banks",
  },
];

const financialStatementLine = [
  // Balance Sheet
  {
    name: "Equity And Liabilities",
    parentId: null,
    unit: "topic",
  },
  {
    name: "Share Capital",
    parentId: null,
  },
  {
    name: "Total Reserves",
    parentId: null,
  },
  {
    name: "Deposits",
    parentId: null,
  },
  {
    name: "Borrowings",
    parentId: null,
  },
  {
    name: "Other Liabilities",
    parentId: null,
  },
  {
    name: "Total Liabilities",
    parentId: null,
  },
  {
    name: "Assets",

    parentId: null,
    unit: "topic",
  },
  {
    name: "Balance with Nepal Rastra Bank",
    parentId: null,
  },
  {
    name: "Balance with Banks",
    parentId: null,
  },

  {
    name: "Investments",
    parentId: null,
  },
  {
    name: "Advances",
    parentId: null,
  },
  {
    name: "Net Block",
    parentId: null,
  },
  {
    name: "Other Assets",
    parentId: null,
  },
  {
    name: "Balance with RBI",
    parentId: null,
  },
  {
    name: "Total Assets",
    parentId: null,
  },
  // P&L
  {
    name: "Net Sales",
    parentId: null,
  },
  {
    name: "Total Expenditure",
    parentId: null,
  },
  {
    name: "Operating Profit",
    parentId: null,
  },
  {
    name: "Other Income",
    parentId: null,
  },
  {
    name: "Interest",
    parentId: null,
  },
  {
    name: "Depreciation",
    parentId: null,
  },
  {
    name: "Exceptional Items",
    parentId: null,
  },
  {
    name: "Profit Before Tax",
    parentId: null,
  },
  {
    name: "Tax",
    parentId: null,
  },
  {
    name: "Net Profit",
    parentId: null,
  },
  {
    name: "Adjusted EPS (Rs.)",
    parentId: null,
  },

  //  Ratios
  {
    name: "ROE",
    parentId: null,
    unit: "%",
  },
  {
    name: "ROA",
    parentId: null,
    unit: "%",
  },
  {
    name: "Net NPA",
    parentId: null,
    unit: "%",
  },
  {
    name: "NIM",
    parentId: null,
    unit: "%",
  },
  {
    name: "CAR",
    parentId: null,
    unit: "%",
  },
  {
    name: "Cost of Liabilities",
    parentId: null,
    unit: "%",
  },
  {
    name: "PEG Ratio",
    parentId: null,
    unit: "%",
  },
];

module.exports = {
  industries,
  companies,
  financialStatement,
  financialStatementLine,
  companyStatmentDetails,
};
