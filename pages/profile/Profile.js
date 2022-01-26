import React from 'react';
import ProfileLayout from '../../components/layout/ProfileLayout';
import SortableTable from '../../components/SortableTable/SortableTable';

function Profile() {
  const chartData = [
    {
      id: 1,
      date: '2021-03-11',
      noOfTransactions: 12343,
      maxPrice: 655,
      minPrice: 630,
      closingPrice: 1120,
      tradedShares: 123123,
      amount: 34535,
      previousClosing: 640,
      priceDifference: 1.2,
      companySlug: 'nabil',
    },
    {
      id: 2,
      date: '2021-03-10',
      noOfTransactions: 23323,
      maxPrice: 666,
      minPrice: 620,
      closingPrice: 655,
      tradedShares: 34342,
      amount: 325647,
      previousClosing: 357,
      priceDifference: 11,
      companySlug: 'nabil',
    },
    {
      id: 3,
      date: '2021-03-09',
      noOfTransactions: 44456,
      maxPrice: 687,
      minPrice: 622,
      closingPrice: 680,
      tradedShares: 23421,
      amount: 474,
      previousClosing: 463,
      priceDifference: 2.3,
      companySlug: 'nabil',
    },
    {
      id: 4,
      date: '2021-03-08',
      noOfTransactions: 67657,
      maxPrice: 700,
      minPrice: 688,
      closingPrice: 690,
      tradedShares: 123453,
      amount: 4475,
      previousClosing: 473,
      priceDifference: 4.2,
      companySlug: 'nabil',
    },
    {
      id: 5,
      date: '2021-03-07',
      noOfTransactions: 35636,
      maxPrice: 688,
      minPrice: 666,
      closingPrice: 677,
      tradedShares: 45432,
      amount: 45785,
      previousClosing: 675,
      priceDifference: 3.9,
      companySlug: 'nabil',
    },
    {
      id: 6,
      date: '2021-03-06',
      noOfTransactions: 8786,
      maxPrice: 677,
      minPrice: 640,
      closingPrice: 655,
      tradedShares: 345674,
      amount: 7864,
      previousClosing: 8545,
      priceDifference: 1.1,
      companySlug: 'nabil',
    },
  ];

  const holdingData = [
    { name: 'Public  Holding', value: 50 },
    { name: 'Government Holding', value: 20 },
  ];

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
      Header: 'Quantity',
      accessor: 'quantity',
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
      Header: 'LTP',
      accessor: 'ltp',
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
        <div className="p-3 shadow bg-white dark:bg-gray-900 rounded-md">
          {/* <h1 className="text-2xl mb-3">My Portfolio</h1> */}
          <SortableTable columns={columns} data={tableData} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* <div className="shadow-sm bg-white dark:bg-gray-900 rounded-sm overflow-hidden">
                <div className="bg-gray-700">
                  <div className="px-3 py-2">
                    <h1 className="text-xs">ASSET STRUCTURE</h1>
                  </div>
                </div>
                <StockHoldingChart data={holdingData} />
              </div>

              <div className="shadow-sm bg-white dark:bg-gray-900 rounded-sm overflow-hidden">
                <div className="bg-gray-700">
                  <div className="px-3 py-2">
                    <h1 className="text-xs">MY ASSET</h1>
                  </div>
                  <div className="flex px-3">
                    <h1>Stock</h1>
                  </div>
                </div>
              </div> */}
        </div>
      </main>
    </ProfileLayout>
  );
}

export default Profile;
