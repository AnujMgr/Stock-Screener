import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total Reserve',
    ['Nabil Bank']: 4000,
    ['Nepal Bank']: 2400,
    ['Laxmi Bank']: 2400,

    fiscalYear: '2018 Q4',
  },
  {
    name: 'Total Profit',
    ['Nabil Bank']: 3000,
    ['Nepal Bank']: 1398,
    ['Laxmi Bank']: 2400,

    fiscalYear: '2019 Q4',
  },
  {
    name: 'EPS',
    ['Nabil Bank']: 2000,
    ['Nepal Bank']: 9800,
    ['Laxmi Bank']: 2400,

    fiscalYear: '2020 Q4',
  },
];

const BarChartForComparision = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
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
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartForComparision;
