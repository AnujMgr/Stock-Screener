// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/client';
import checkAuth from '../middleware/checkAuthServer';

const AddToWatchList = async (req, res) => {
  const { userId, companyId } = req.body;
  // const getToken = cookie.parse(req.headers.cookie);
  // const token = getToken.refreshToken;
  // const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (req.method === 'GET') {
    const watchlists = await prisma.watchList.findMany({
      where: {
        userId: userId,
      },
      include: {
        watchlistfact: {
          where: {
            companyId: companyId,
          },
        },
      },
    });
    return res.json({ watchlists });
  }
  console.log('----------------------');
  const watchList = await prisma.watchList.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!watchList)
    await prisma.watchList.create({
      data: {
        userId: userId,
      },
    });

  const isAlreadyAddedInWatchList = await prisma.watchListFact.findFirst({
    where: {
      companyId: companyId,
      watchlistId: Number(watchList.id),
    },
  });

  if (req.method === 'POST') {
    if (!isAlreadyAddedInWatchList) {
      const fact = await prisma.watchListFact.create({
        data: {
          companyId: companyId,
          watchlistId: watchList.id,
        },
      });
      res.json({ fact });
    } else if (isAlreadyAddedInWatchList) {
      const fact = await prisma.watchListFact.delete({
        where: {
          watchlistId: watchList.id,
        },
      });
      res.json({ fact });
    }
  } else {
    res.json({ error: true, message: 'Method Not Alowed !' });
  }
};

export default checkAuth(AddToWatchList);
