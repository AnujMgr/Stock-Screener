import { useTheme } from 'next-themes';
import React from 'react';
import { Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, dataKey1, dataKey2, height }) => {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        width={500}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 0" vertical={false} opacity={0.4} />
        <XAxis dataKey="fiscalYear" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            fill: theme == 'light' ? '#E5E7EB' : '#1F2937',
            opacity: 0.6,
          }}
        />
        <Legend formatter={renderColorfulLegendText} />
        <Bar dataKey={dataKey2} fill="#1E40AF" barSize={10} />
        <Bar dataKey={dataKey1} fill="#10B981" barSize={10} />
        <YAxis orientation="right" fontSize={'0.8em'} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload != undefined) {
    return (
      <Fragment>
        {payload.map(({ value, name }) => {
          return (
            <div key={name} className="bg-gray-800 p-2 text-white shadow-md">
              <p className="text-xs capitalize mb-0">
                {name}
                {': '}
                {value}
              </p>
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
};

const renderColorfulLegendText = (value) => {
  return <span className="capitalize">{value}</span>;
};

export default CustomBarChart;
