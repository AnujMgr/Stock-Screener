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
    id: ID!
    financialStatementLineId: ID!
    fiscalYear: Int
    quarter: String!
    amount: Float
    sequence: Int!
    statementLines: [FinancialStatementLine]
    # financialStatementFacts: [FinancialStatementFact]
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
    ): [FinancialStatementWithFacts]
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
      return await prisma.company.findMany();
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
      // return prisma.financialStatementLine.findFirst({
      //   where: {
      //     id: Number(args.id),
      //   },
      // });

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
      var financialFact = [];

      const financialStatementSequence =
        await prisma.financialStatementLineSequence.findMany({
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
                },
              },
            },
          },
        });

      financialStatementSequence.map((statement) => {
        const fact = {
          ...statement.financialStatementLine.financialStatementFact,
        };
        financialFact.push({ ...fact[0], sequence: statement.sequence });
      });

      // financialStatementSequence.map((statement) => {
      //   financialFact.push(
      //     ...statement.financialStatementLine.financialStatementFact
      //   );
      // });

      return financialFact;
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
