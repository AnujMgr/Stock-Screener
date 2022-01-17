import React, { Fragment } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { useTheme } from "next-themes";

const MiniChart = ({ data }) => {
  const { theme } = useTheme();
  // data.reverse();

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme == "light" ? "#2563EB" : "#E5E7EB"}
            strokeWidth={2}
            dot={{ fill: theme == "light" ? "#2563EB" : "#E5E7EB" }}
            label={<CustomizedLabel />}
          />
          <XAxis dataKey="amount" reversed hide={true} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3">
        {data.map((fact, index) =>
          index === 0 || index === 2 || index === 4 ? (
            <div key={fact.id} className="flex flex-col text-center">
              <p className="text-xs">{fact.fiscalYear} </p>
              <p className="font-bold">{fact.amount}%</p>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

const CustomizedLabel = ({ x, y, stroke, value }) => {
  const { theme } = useTheme();

  return (
    <svg>
      <defs>
        <filter
          id="rounded-corners"
          x="-20%"
          width="140%"
          y="-35%"
          height="160%"
        >
          <feFlood floodColor={theme == "light" ? "#1D4ED8" : "#1F2937"} />
          <feGaussianBlur stdDeviation="2" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0 1" />
          </feComponentTransfer>

          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 1 1 1 1 1 1 1" />
          </feComponentTransfer>
          <feComposite operator="over" in="SourceGraphic" />
        </filter>
      </defs>

      <text
        filter="url(#rounded-corners)"
        x={x}
        y={y}
        dy={-10}
        fill={theme == "light" ? "#fff" : "#fff"}
        fontSize={10}
        textAnchor="middle"
      >
        {value}
      </text>
    </svg>
  );
  s;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload != undefined) {
    return (
      <Fragment>
        {payload.map(({ value, payload }) => {
          return (
            <div className="p-2 bg-gray-800 shadow-xl" key={value}>
              <p className="text-xs text-white">Year: {payload.fiscalYear}</p>

              <p className="text-xs text-white">
                <span>Ratio: {value}</span>
              </p>
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
};

export default MiniChart;
