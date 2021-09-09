import { ApolloServer, gql } from "apollo-server-micro";
import prisma from "../../prisma/client";

const typeDefs = gql`
  type Industry {
    id: ID!
    name: String!
  }

  type Company {
    id: ID!
    name: String!
    slug: String!
    symbol: String!
    industry: Industry!
    balanceSheetId: Int!
    profitLossId: Int!
  }

  type FinancialStatement {
    id: ID!
    name: String!
    financialStatementLines: [FinancialStatementLine!]!
  }

  type ScreenerFact {
    statementId: ID!
    name: String!
    companyId: ID!
    amount: Float!
  }

  type ScreenerStatement {
    id: ID!
    name: String!
  }

  type ScreenerData {
    screenerFacts: [ScreenerFact]
    statementLines: [ScreenerStatement]
  }

  type FinancialStatementLine {
    id: ID!
    name: String!
    financialStatementFacts: [FinancialStatementFact!]!
    financialStatement: FinancialStatement
  }

  type FinancialStatementFact {
    id: ID!
    financialStatementLineId: Int
    fiscalYear: Int
    quarter: String!
    amount: Float
    statementLine: FinancialStatementLine
  }

  type FinancialStatementWithFacts {
    financialStatement: FinancialStatementLine
    financialStatementFacts: [FinancialStatementFact]
  }

  type Query {
    # get all financial Statements
    getCompanyById(id: ID!): Company
    getAllCompanies: [Company]

    getFinancialStatementById(id: ID!): FinancialStatement
    getAllFinancialStatement: [FinancialStatement]

    getAllFinancialStatementLine: [FinancialStatementLine]
    getFinancialStatementLineById(id: ID!): [FinancialStatementLine]

    getStatementWithFacts(
      id: ID!
      quarter: String!
      companyId: ID!
      take: Int!
    ): [FinancialStatementWithFacts]

    getScreenerData(id: ID!, quarter: String!, fiscalYear: Int!): ScreenerData
  }
`;

const resolvers = {
  Query: {
    getCompanyById: async (parent, args, context) => {
      return await prisma.company.findFirst({
        where: {
          id: Number(args.id),
        },
        include: {
          industry: true,
        },
      });
    },

    getAllCompanies: async () => {
      return await prisma.company.findMany({});
    },

    getFinancialStatementById: async (parent, args, context) => {
      return prisma.financialStatement.findFirst({
        where: {
          id: Number(args.id),
        },
      });
    },

    //resolver to get all financial Statements
    getAllFinancialStatementLine: (parent, args, context) => {
      return prisma.financialStatementLine.findMany();
    },
    getFinancialStatementLineById: async (parent, args, context) => {
      return await prisma.financialStatementLine.findMany({
        where: {
          financialStatement: {
            some: {
              financialStatementId: 1,
            },
          },
        },
      });
    },

    getStatementWithFacts: async (parent, args, context) => {
      const financialStatement = [];

      const data = await prisma.financialStatementLineSequence.findMany({
        where: {
          financialStatementId: Number(args.id),
        },
        include: {
          financialStatementLine: {
            include: {
              financialStatementFact: {
                where: {
                  quarter: args.quarter,
                  companyId: Number(args.companyId),
                },
                orderBy: {
                  fiscalYear: "desc",
                },
                take: Number(args.take),
              },
            },
          },
        },
        orderBy: {
          sequence: "asc",
        },
      });

      data.map((fact) => {
        financialStatement.push({
          financialStatement: {
            id: fact.financialStatementLine.id,
            name: fact.financialStatementLine.name,
            parentId: fact.financialStatementLine.parentId,
          },
          financialStatementFacts:
            fact.financialStatementLine.financialStatementFact.map((line) => ({
              id: line.id,
              amount: line.amount,
              fiscalYear: line.fiscalYear,
            })),
        });
      });
      return financialStatement;
    },

    getScreenerData: async (parent, args, context) => {
      const statements = [];
      const screenerData = [];

      const data = await prisma.financialStatementLineSequence.findMany({
        where: {
          financialStatementId: Number(args.id),
        },
        include: {
          financialStatementLine: {
            include: {
              financialStatementFact: {
                where: {
                  quarter: args.quarter,
                },
                orderBy: {
                  fiscalYear: "desc",
                },
                take: 1,
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

      return { statementLines: statements, screenerFacts: screenerData };
    },
  },

  FinancialStatement: {
    financialStatementLines: async (parent, args, context) => {
      return await prisma.financialStatementLine.findMany({
        where: {
          financialStatement: {
            some: {
              financialStatementId: Number(parent.id),
            },
          },
        },
      });
    },
  },

  FinancialStatementLine: {
    financialStatementFacts: async (parent, args, context) => {
      // return console.log(parent);
      console.log(parent.id);
      return await prisma.financialStatementFact.findMany({
        where: {
          financialStatementLineId: Number(parent.id),
        },
      });
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = { api: { bodyParser: false } };

export default handler;
