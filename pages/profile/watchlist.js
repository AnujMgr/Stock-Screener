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
  payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profile: {
        select: {
          watchlist: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });

  const watchlist = await prisma.watchList.findMany({
    include: {
      company: true,
    },
  });

  return {
    props: {
      user,
      watchlist,
    },
  };
}

function watchlist({ user, watchlist }) {
  console.log(user);
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
      Header: 'LTP',
      accessor: 'ltp',
    },
    {
      Header: 'Buy At (Avg)',
      accessor: 'buy_at',
    },
    {
      Header: 'Value When Bought',
      accessor: 'value_when_bought',
    },

    {
      Header: 'Value As Of LTP',
      accessor: 'value_as_of_ltp',
    },
    {
      Header: 'Profit/Loss',
      accessor: 'profit_loss',
    },
  ];

  const tableData = [
    {
      company: 'Nabil Bank',
      symbol: 'NABIL',
      quantity: '100',
      buy_at: '300',
      value_when_bought: '43000',
      ltp: '400',
      value_as_of_ltp: '40000',
      profit_loss: '-1000',
    },
  ];
  return (
    <ProfileLayout showSearch={true} showSymbol={true}>
      <main className="xl:container mt-3 mx-1 md:mx-3 xl:mx-auto px-2">
        <section className="bg-white dark:bg-gray-900 shadow mb-3 rounded-0 md:rounded-lg mt-4 p-3">
          <SortableTable columns={columns} data={tableData} />
        </section>
      </main>
    </ProfileLayout>
  );
}

export default watchlist;
