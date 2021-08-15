import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#1E40AF", "#10B981", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StockHoldingChart = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-sm h-96 mx-auto">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={1}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 justify-center">
        {data.map((holding, index) => (
          <div className="flex flex-row" key={holding.name}>
            <div
              className="h-3.5 w-3.5 mr-2 mt-0.5"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <p className="text-gray-900 dark:text-gray-200">
              {holding.name}: {Number(holding.value).toLocaleString()}
            </p>
          </div>
        ))}

        {/* <div className="flex">
          <div
            className="h-3.5 w-3.5 mr-2 mt-0.5"
            style={{ backgroundColor: COLORS[1] }}
          ></div>
          <p className="text-gray-900 dark:text-gray-200">Public: 30%</p>
        </div> */}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload != undefined) {
    return (
      <>
        {payload.map(({ value, name }) => {
          return (
            <div
              key={value}
              className="bg-gray-800 p-2 text-gray-900 dark:text-gray-200"
            >
              <p className="text-xs text-white dark:text-gray-200">
                {name}:{" "}
                <span>
                  {typeof value === "number"
                    ? value.toLocaleString()
                    : (0).toFixed(1).toLocaleString()}
                </span>
              </p>
            </div>
          );
        })}
      </>
    );
  }
  return null;
};

export default StockHoldingChart;
