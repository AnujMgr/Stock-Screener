import { gql } from "@apollo/client";

export const GET_SCREENER_DATA = gql`
  query getScreenerData($id: ID!, $quarter: String!, $fiscalYear: Int!) {
    getScreenerData(id: $id, quarter: $quarter, fiscalYear: $fiscalYear) {
      screenerFacts {
        statementId
        companyId
        name
        amount
      }
      statementLines {
        id
        name
      }
    }
  }
`;

export const GET_STATEMENT_WITH_FACTS = gql`
  query getStatementWithFacts(
    $statementId: ID!
    $quarter: String!
    $companyId: ID!
    $take: Int!
  ) {
    getStatementWithFacts(
      id: $statementId
      quarter: $quarter
      companyId: $companyId
      take: $take
    ) {
      financialStatement {
        id
        name
      }
      financialStatementFacts {
        id
        amount
        fiscalYear
      }
    }
  }
`;

export const GET_STATEMENT_LINES = gql`
  query getFinancialStatementLineById($statementId: ID!) {
    getFinancialStatementLineById(id: $statementId) {
      id
      name
    }
  }
`;

export const GET_ALL_COMPANIES = gql`
  query getAllCompanies {
    getAllCompanies {
      id
      name
      symbol
      slug
      balanceSheetId
      profitLossId
    }
  }
`;

export const GET_COMPANY_BY_ID = gql`
  query getCompanyById($id: ID!) {
    getCompanyById(id: $id) {
      id
      name
      symbol
      balanceSheetId
      profitLossId
    }
  }
`;
