import React, { Fragment } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

const MiniChart = ({ data }) => {
  const { theme } = useTheme();
  // data.reverse();

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data.reverse()}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke={theme == "light" ? "#34D399" : "#E5E7EB"}
            strokeWidth={2}
            dot={{ fill: theme == "light" ? "#34D399" : "#E5E7EB" }}
            label={<CustomizedLabel />}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>  
      <div className="grid grid-cols-3">
        <div className="flex flex-col text-center">
          <p className="text-xs">1 YEAR</p>
          <p className="font-bold">5.4%</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-xs">1 YEAR</p>
          <p className="font-bold">5.4%</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-xs">1 YEAR</p>
          <p className="font-bold">5.4%</p>
        </div>
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
          <feFlood floodColor={theme == "light" ? "#9CA3AF" : "#1F2937"} />
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
          const newDate = new Date(payload.date);

          return (
            <div className="p-2 bg-gray-800 shadow-xl" key={value}>
              <p className="text-xs text-white">
                Year: {newDate.getFullYear()}
              </p>

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
