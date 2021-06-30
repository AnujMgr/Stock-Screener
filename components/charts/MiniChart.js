import React, { Fragment, PureComponent } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import moment from "moment";

const data = [
  {
    name: "2014",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "2015",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2016",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "2017",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "2018",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "2019",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "2020",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  return (
    <svg
      x={cx - 5}
      y={cy - 0}
      width={50}
      height={60}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <g>
        <rect
          x="0"
          y="0"
          rx="80"
          ry="80"
          width="450"
          height="350"
          fill="#e1efff"
        ></rect>
        <text
          x="60"
          y="230"
          fontFamily="Muli"
          fontSize="12rem"
          fontWeight="bold"
          fill="#003bde"
        >
          {value}
        </text>
      </g>
    </svg>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload != undefined) {
    return (
      <Fragment>
        {payload.map(({ value, name, color }) => {
          return (
            <div className="p-2 bg-gray-100 dark:bg-black" key={value}>
              <p className="text-xs">
                {moment(new Date(label)).format("YYYY").slice(0)}
              </p>

              <p className="text-xs">
                <span>
                  {typeof value === "number"
                    ? value.toFixed(1)
                    : (0).toFixed(1)}
                </span>
              </p>
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
};

export const MiniChart = () => {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={data} height={150}>
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#003bde"
          strokeWidth={2}
          // label={<CustomizedLabel />}
          dot={<CustomizedDot />}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <XAxis dataKey="amt" color="white" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MiniChart;
