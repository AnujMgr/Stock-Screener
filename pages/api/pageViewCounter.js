// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/client";
import checkAuth from "./middleware/checkAuthServer";

async function pageViewCounter(req, res) {
  if (req.method === "POST") {
    const { companyId } = req.body;

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    const isTrendingStockEmpty = await prisma.trendingStock.findFirst();
    // Trending stats of company will be reset every 30 days
    // It checks if trending stats of companies must be reset or not
    // This will reset views of all companies and resets time to 30 days from todays date
    if (isTrendingStockEmpty) {
      var date = new Date();
      const endDate = new Date(isTrendingStockEmpty.endAt);
      if (date.getTime() > endDate.getTime()) {
        await prisma.trendingStock.updateMany({
          data: {
            views: 0,
            startedAt: date,
            endAt: date.addDays(30),
          },
        });
      }
    }

    const doesCounterExist = await prisma.trendingStock.findFirst({
      where: {
        companyId: companyId,
      },
    });
    if (!doesCounterExist) {
      var date = new Date();

      await prisma.trendingstock.create({
        data: {
          views: 1,
          companyId: Number(companyId),
          startedAt: date,
          endAt: date.addDays(30),
        },
      });
    } else {
      await prisma.trendingStock.update({
        where: {
          companyId: Number(companyId),
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }
    res.status(200).send();
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

export default checkAuth(pageViewCounter);
