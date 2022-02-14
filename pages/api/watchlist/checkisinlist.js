// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../prisma/client';
import checkAuth from '../middleware/checkAuthServer';

const CheckIsInList = async (req, res) => {
  const { userId, companyId } = req.query;
  // const getToken = cookie.parse(req.headers.cookie);
  // const token = getToken.refreshToken;
  // const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

  if (req.method === 'GET') {
    try {
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
      if (!watchlists) return res.json({ isInWatchList: false });

      return res.json({ isInWatchList: watchlists[0].watchlistfact.length > 0 ? true : false });
    } catch (error) {
      console.log(error);
      return res.json({ isInWatchList: false });
    }
  } else {
    res.json({ error: true, message: 'Method Not Alowed !' });
  }
};

export default checkAuth(CheckIsInList);
