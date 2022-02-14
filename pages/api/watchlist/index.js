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
        userId: Number(userId),
      },
      include: {
        watchlistfact: {
          where: {
            companyId: Number(companyId),
          },
        },
      },
    });
    return res.json({ watchlists });
  }
  const watchList = await prisma.watchList.findFirst({
    where: {
      userId: Number(userId),
    },
  });

  const isAlreadyAddedInWatchList = await prisma.watchListFact.findFirst({
    where: {
      companyId: Number(companyId),
      watchlistId: Number(watchList.id),
    },
  });

  if (req.method === 'POST') {
    if (!isAlreadyAddedInWatchList) {
      await prisma.watchListFact.create({
        data: {
          companyId: companyId,
          watchlistId: watchList.id,
        },
      });
      return res.json({ isInList: true, message: 'Successfully Added to WatchList !' });
    } else res.json({ isInList: true, message: 'Already in List !' });
  } else if (req.method === 'DELETE') {
    if (isAlreadyAddedInWatchList) {
      const currentWatchList = await prisma.watchListFact.findFirst({
        where: {
          companyId: companyId,
          watchlistId: watchList.id,
        },
      });

      await prisma.watchListFact.delete({
        where: {
          id: currentWatchList.id,
          // companyId: Number(companyId),
        },
      });
      return res.json({ isInList: false, message: 'Successfully Removed From WatchList !' });
    } else res.json({ isInList: false, message: 'Couldn`t remove not in list !' });
  } else {
    res.json({ error: true, message: 'Method Not Alowed !' });
  }
};

export default checkAuth(AddToWatchList);
