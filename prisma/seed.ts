import prisma from "./client";
import faker from "faker";
import {
  industries,
  companies,
  financialStatement,
  financialStatementLine,
  companyStatmentDetails,
} from "./data";

async function main() {
  const currentYear = 2021;
  const noOfBank = 10;

  await prisma.industry.createMany({
    data: industries,
  });

  await prisma.financialStatement.createMany({
    data: financialStatement,
  });

  await prisma.companyStatementDetails.createMany({
    data: companyStatmentDetails,
  });

  await prisma.company.createMany({
    data: companies,
  });

  await prisma.financialStatementLine.createMany({
    data: financialStatementLine,
  });

  // Balance Sheet
  for (let j = 1; j < 17; j++) {
    await prisma.financialStatementLineSequence.create({
      data: {
        financialStatementId: 1,
        financialStatementLineId: j,
        sequence: j,
      },
    });
  }
  // Profit And Loss
  for (let j = 17; j < 28; j++) {
    await prisma.financialStatementLineSequence.create({
      data: {
        financialStatementId: 2,
        financialStatementLineId: j,
        sequence: j - 16,
      },
    });
  }
  //Ratios
  for (let j = 28; j < 35; j++) {
    await prisma.financialStatementLineSequence.create({
      data: {
        financialStatementId: 4,
        financialStatementLineId: j,
        sequence: j,
      },
    });
  }

  for (let i = 1; i < 17; i++) {
    if (i == 1 || i == 8) {
      continue;
    }
    await prisma.financialStatementFact.create({
      data: {
        companyId: 1,
        fiscalYear: "2020/2021",
        quarter: "Q4",
        amount: faker.datatype.float(),
        financialStatementLineId: i,
      },
    });
  }

  for (let i = 17; i < 28; i++) {
    await prisma.financialStatementFact.create({
      data: {
        companyId: 1,
        fiscalYear: "2020/2021",
        quarter: "Q4",
        amount: faker.datatype.float(),
        financialStatementLineId: i,
      },
    });
  }

  // for (let i = 0; i < 10; i++) {
  //   await prisma.company.create({
  //     data: {
  //       name: faker.company.companyName(),
  //       slug: faker.lorem.slug(),
  //       symbol: faker.random.word(),
  //       balanceSheetId: 1,
  //       companyEssentialsId: 1,
  //       companyRatioId: 1,
  //       profitLossId: 1,
  //       industryId: 1,
  //     },
  //   });
  // }

  // for (var i = 0; i < 31; i++) {
  //   await prisma.financialStatementLine.create({
  //     data: {
  //       name: faker.random.word(),
  //       parentId: 0,
  //       unit: "",
  //     },
  //   });
  // }

  // for (var i = 0; i < 5; i++) {
  //   var fiscalYear = currentYear - i;
  //   for (var j = 0; j < noOfBank; j++) {
  //     var companyId = i;
  //     for (var k = 1; k < 5; k++) {
  //       var quarter = k;
  //       for (var l = 2; l < noOfBank; l++) {
  //         await prisma.financialStatementFact.create({
  //           data: {
  //             companyId: l,
  //             financialStatementLineId: faker.random.number({
  //               min: 5,
  //               max: 36,
  //               precision: 1,
  //             }),
  //             fiscalYear: fiscalYear,
  //             quarter: "Q1",
  //             amount: faker.datatype.float(),
  //           },
  //         });
  //       }
  //     }
  //   }
  // }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
