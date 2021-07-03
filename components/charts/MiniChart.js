import React, { Fragment, PureComponent } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import moment from "moment";
import { useTheme } from "next-themes";

const data = [
  {
    year: "2014",
    ratio: 2.22,
  },
  {
    year: "2015",
    ratio: 33.22,
  },
  {
    year: "2016",
    ratio: 0.2,
  },
  {
    year: "2017",
    ratio: -1,
  },
  {
    year: "2018",
    ratio: 22.22,
  },
  {
    year: "2019",
    ratio: 50.22,
  },
  {
    year: "2020",
    ratio: 1,
  },
];

const MiniChart = () => {
  const { theme } = useTheme();

  return (
    <>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} height={150}>
          <Line
            type="monotone"
            dataKey="ratio"
            stroke={theme == "light" ? "#34D399" : "#fff"}
            strokeWidth={2}
            dot={{ fill: theme == "light" ? "#34D399" : "#fff" }}
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
          return (
            <div className="p-2 bg-gray-800 shadow-xl" key={value}>
              <p className="text-xs text-white">Year: {payload.year}</p>

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
