import prisma from "./client";
import faker from "faker";

async function main() {
  const currentYear = 2021;
  const noOfBank = 10;

  for (let i = 0; i < 10; i++) {
    await prisma.company.create({
      data: {
        name: faker.company.companyName(),
        slug: faker.lorem.slug(),
        symbol: faker.random.word(),
        industryId: 1,
        balanceSheetId: 1,
        profitLossId: 1,
      },
    });
  }

//   for (var i = 0; i < 31; i++) {
//     await prisma.financialStatementLine.create({
//       data: {
//         name: faker.random.word(),
//       },
//     });
//   }

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
