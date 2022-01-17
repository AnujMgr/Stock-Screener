import { data } from 'autoprefixer';
import React from 'react';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

// const data = [
//   {
//     name: 'Total Reserve',
//     ['Nabil Bank']: 4000,
//     ['Nepal Bank']: 2400,
//     ['Laxmi Bank']: 1400,
//     fiscalYear: '2018 Q4',
//   },
//   {
//     name: 'Total Reserve',
//     ['Nabil Bank']: 3000,
//     ['Nepal Bank']: 1398,
//     ['Laxmi Bank']: 400,
//     fiscalYear: '2019 Q4',
//   },
//   {
//     name: 'EPS',
//     ['Nabil Bank']: 2000,
//     ['Nepal Bank']: 1800,
//     ['Laxmi Bank']: 300,
//     fiscalYear: '2020 Q4',
//   },
// ];

const MultipleLineGraph = ({ chartData, companies }) => {
  const lineColors = ['#1d4ed8', '#fbbf24', '#be123c', '#15803d'];
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={200} height={100} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fiscalYear" interval="preserveEnd" />
        <YAxis orientation="right" fontSize={11} width={40} />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        {companies.map((company, i) => (
          <Line
            key={company.id}
            type="monotone"
            dataKey={company.name}
            stroke={`${lineColors[i]}`}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
        {/* <Line type="monotone" dataKey="Nepal Bank" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
        <Line type="monotone" dataKey="Laxmi Bank" stroke="#000" activeDot={{ r: 8 }} strokeWidth={2} /> */}
      </LineChart>
      {/* <BarChart
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
        <CartesianGrid strokeDasharray="0" />
        <XAxis dataKey="fiscalYear" />

        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Nabil Bank" fill="#8884d8" />
        <Bar dataKey="Nepal Bank" fill="#82ca9d" />
        <Bar dataKey="Laxmi Bank" fill="#82ca9d" />
      </BarChart> */}
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <>
        <div className="bg-gray-800 p-2 text-white shadow-md">
          <p className="text-sm"> {`Fiscal Year: ${payload[0].payload.fiscalYear}`}</p>
          {payload.map((data) => (
            <p key={data.dataKey} className="text-sm">{`${data.dataKey}: ${payload[0].payload[data.dataKey]}`}</p>
          ))}
        </div>
      </>
    );
  }

  return null;
};

export default MultipleLineGraph;
