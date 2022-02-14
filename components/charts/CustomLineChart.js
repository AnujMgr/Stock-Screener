import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 650,
//     tradedShares: 123123,
//     amount: 34535,
//     noOfTransactions: 12343,
//     date: '2021-03-11',
//   },
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 655,
//     tradedShares: 34342,
//     amount: 325647,
//     noOfTransactions: 23323,
//     date: '2021-03-10',
//   },
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 680,
//     tradedShares: 23421,
//     amount: 474,
//     noOfTransactions: 44456,
//     date: '2021-03-09',
//   },
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 690,
//     tradedShares: 123453,
//     amount: 4475,
//     noOfTransactions: 67657,
//     date: '2021-03-08',
//   },
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 677,
//     tradedShares: 45432,
//     amount: 45785,
//     noOfTransactions: 35636,
//     date: '2021-03-07',
//   },
//   {
//     companyName: 'Nabil Bank',
//     closingPrice: 655,
//     tradedShares: 345674,
//     amount: 7864,
//     noOfTransactions: 8786,
//     date: '2021-03-06',
//   },
// ];

const data = [
  {
    date: '2021-03-11',
    ['Nabil Bank']: 4000,
    ['Nepal Bank']: 2400,
    ['Laxmi Bank']: 2400,
  },
  {
    date: '2021-03-12',
    ['Nabil Bank']: 3000,
    ['Nepal Bank']: 1398,
    ['Laxmi Bank']: 2210,
  },
  {
    date: '2021-03-13',
    ['Nabil Bank']: 2000,
    ['Nepal Bank']: 9800,
    ['Laxmi Bank']: 2290,
  },
  {
    date: '2021-03-14',
    ['Nabil Bank']: 2780,
    ['Nepal Bank']: 3908,
    ['Laxmi Bank']: 2000,
  },
  {
    date: '2021-03-15',
    ['Nabil Bank']: 1890,
    ['Nepal Bank']: 4800,
    ['Laxmi Bank']: 2181,
  },
  {
    date: '2021-03-16',
    ['Nabil Bank']: 2390,
    ['Nepal Bank']: 3800,
    ['Laxmi Bank']: 2500,
  },
  {
    date: '2021-03-17',
    ['Nabil Bank']: 3490,
    ['Nepal Bank']: 4300,
    ['Laxmi Bank']: 2100,
  },
];

function CustomLineChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="6 6" /> */}
        <XAxis dataKey="name" fontSize={11} />
        <YAxis fontSize={11} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="Nabil Bank" stroke="#8884d8" activeDot={1} />
        <Line type="monotone" dataKey="Nepal Bank" stroke="#82ca9d" dot={0} activeDot={1} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload != undefined) {
    return (
      <div className="bg-gray-800 p-2 text-white shadow-md">
        <p className="text-xs">{payload[0].payload.date}</p>
        {payload.map(({ value, name, payload }) => {
          return (
            <p key={value} className="text-xs">
              {name} : <span>{typeof value === 'number' ? value.toFixed(1) : (0).toFixed(1)}</span>
            </p>
          );

          //   console.log(payload);
          //   return (
          //     <div key={value} className="bg-gray-800 p-2 text-white shadow-md">
          //       {/* <p className="text-xs">{moment(new Date(label)).format('DD MMM YYYY').slice(0)}</p> */}
          //       <p className="text-xs">
          //         {payload.name} : <span>{typeof value === 'number' ? value.toFixed(1) : (0).toFixed(1)}</span>
          //       </p>
          //       {/* <p className="text-xs">
          //         Volume: <span>{payload.noOfTransactions.toLocaleString()}</span>
          //       </p> */}
          //     </div>
          //   );
        })}
      </div>
    );
  }

  return null;
};

export default CustomLineChart;
