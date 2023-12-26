import { verify } from 'jsonwebtoken';
import React from 'react';
import ProfileLayout from '../../components/layout/ProfileLayout';
import SortableTable from '../../components/SortableTable/SortableTable';
import cookie from 'cookie';
import prisma from '../../prisma/client';

export async function getServerSideProps({ query, req }) {
  let payload = null;
  const getToken = cookie.parse(req.headers.cookie);
  const token = getToken.refreshToken;
  payload = verify(token, process.env.REFRESH_TOKEN_SECRET); //Get User info

  const watchlist = await prisma.watchList.findFirst({
    where: {
      userId: payload.userId,
    },
    include: {
      watchlistfact: {
        include: {
          company: {
            select: {
              name: true,
              symbol: true,
              companyPrice: {
                select: {
                  closingPrice: true,
                  previousClosing: true,
                },
                orderBy: {
                  date: 'desc',
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      watchlist,
    },
  };
}

function watchlist({ watchlist }) {
  const columns = [
    {
      Header: 'Company',
      accessor: 'company',
      className: 'table-title bg-white dark:bg-gray-900 px-4 py-4 sticky left-0 ',
    },
    {
      Header: 'Symbol',
      accessor: 'symbol',
    },
    {
      Header: 'Previous Closing',
      accessor: 'previousClosing',
    },
    {
      Header: 'LTP',
      accessor: 'ltp',
    },
  ];

  const tableData = [];

if(watchlist)
  watchlist.watchlistfact.map((list) => {
    tableData.push({
      company: list.company.name,
      symbol: list.company.symbol,
      ltp: list.company.companyPrice.length > 0 ? list.company.companyPrice[0].closingPrice : 'NaN',
      previousClosing: list.company.companyPrice.length > 0 ? list.company.companyPrice[0].previousClosing : 'NaN',
    }); 
  });

  return (
    <ProfileLayout showSearch={true} showSymbol={true} title={`My Watchlist`}>
      <main className="xl:container mt-3 mx-1 md:mx-3 xl:mx-auto px-2">
        <section className="bg-white dark:bg-gray-900 shadow mb-3 rounded-0 md:rounded-lg mt-4 p-3">
          <h1 className="text-xl mb-4">My Watchlist</h1>
          <SortableTable columns={columns} data={tableData} />
        </section>
      </main>
    </ProfileLayout>
  );
}

export default watchlist;
