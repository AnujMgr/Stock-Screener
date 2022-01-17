import React, { useState, Fragment } from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Bar,
} from "recharts";
import { useTheme } from "next-themes";

const CustomAreaChart = ({
  data,
  dataKeyForArea,
  showPeriodSelector,
  dataLength,
}) => {
  const { theme } = useTheme();
  const [timeSpan, setTimeSpan] = useState(false);
  const [activeMenu, setActiveMenu] = useState("default");

  const color = theme == "light" ? "black" : "white";
  var dataLength = data.length; // length of data
  var periodData = [...data]; // copy data to period data

  if (timeSpan !== false) {
    periodData.length = timeSpan;
  }

  function toggleTimeSpan(timespan, menu) {
    setTimeSpan(timespan);
    setActiveMenu(menu);
  }

  return (
    <Fragment>
      {/* <div className="flex justify-between px-3"> */}
      {showPeriodSelector ? (
        <PeriodSelector
          dataLength={dataLength}
          toggleTimeSpan={toggleTimeSpan}
          activeMenu={activeMenu}
        />
      ) : null}
      {/* </div> */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          height={400}
          width={1300}
          data={periodData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme == "light" ? "#b7e1c2" : "#2451B7"}
                stopOpacity={theme == "light" ? 1 : 0.4}
              />
              <stop
                offset={theme == "light" ? "85%" : "75%"}
                stopColor={theme == "light" ? "#D1FAE5" : "#2451B7"}
                stopOpacity={theme == "light" ? 0.1 : 0.05}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey={dataKeyForArea}
            stroke={theme == "light" ? "#03e08b" : "#2451B7"}
            fill="url(#color)"
            strokeWidth={1.6}
          />
          <Bar dataKey="noOfTransaction" barSize={20} fill="#413ea0" />
          {/* <CartesianGrid strokeDasharray="3 0" vertical={false} opacity={0.4} /> */}
          <Bar dataKey="noOfTransaction" barSize={20} fill="#413ea0" />
          <XAxis
            color={color}
            dataKey="date"
            reversed
            tick={CustomizedAxisTick}
          />
          <YAxis orientation="right" fontSize={11} width={40} />
          <Tooltip content={<CustomTooltip />} />
          <Brush fill={theme == "light" ? "#EFF6FF" : "#111827"} />
        </AreaChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload != undefined) {
    return (
      <Fragment>
        {payload.map(({ value, volume, payload }) => {
          return (
            <div key={value} className="bg-gray-800 p-2 text-white shadow-md">
              <p className="text-xs">
                {moment(new Date(label)).format("DD MMM YYYY").slice(0)}
              </p>

              <p className="text-xs">
                Price:{" "}
                <span>
                  {typeof value === "number"
                    ? value.toFixed(1)
                    : (0).toFixed(1)}
                </span>
              </p>
              <p className="text-xs">
                Volume: <span>{payload.noOfTransactions.toLocaleString()}</span>
              </p>
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
};

const PeriodSelector = ({ dataLength, toggleTimeSpan, activeMenu }) => {
  if (dataLength < 30) return <></>;
  return (
    <div className="rounded-sm border border-gray-500 dark:border-gray-500 overflow-hidden">
      {dataLength >= 30 && (
        <button
          className={`px-3 py-1  ${
            activeMenu === "1m" &&
            "bg-blue-700 dark:bg-indigo-900 text-gray-100"
          }`}
          onClick={(e) => toggleTimeSpan(30, "1m")}
        >
          1M
        </button>
      )}
      {dataLength >= 90 && (
        <button
          className={`px-3 py-1  ${
            activeMenu === "3m" &&
            "bg-blue-700 dark:bg-indigo-800 text-gray-100"
          }`}
          onClick={(e) => toggleTimeSpan(90, "3m")}
        >
          3M
        </button>
      )}
      {dataLength >= 180 && (
        <button
          className={`px-3 py-1  ${
            activeMenu === "6m" &&
            "bg-blue-700 dark:bg-indigo-800 text-gray-100"
          }`}
          onClick={(e) => toggleTimeSpan(180, "6m")}
        >
          6M
        </button>
      )}
      {dataLength > 360 && (
        <button
          className={`px-3 py-1  ${
            activeMenu === "1yrs" &&
            "bg-blue-700 dark:bg-indigo-800 text-gray-100"
          }`}
          onClick={(e) => toggleTimeSpan(360, "1yrs")}
        >
          1yrs
        </button>
      )}
      {dataLength > 1800 && (
        <button
          className={`px-3 py-1  ${
            activeMenu === "5yrs" &&
            "bg-blue-700 dark:bg-indigo-800 text-gray-100"
          }`}
          onClick={(e) => toggleTimeSpan(1800, "5yrs")}
        >
          5yrs
        </button>
      )}
    </div>
  );
};

const CustomizedAxisTick = ({ x, y, payload, color }) => {
  const dateTip = moment(new Date(payload.value))
    .format("MMM YYYY")
    .slice(0, 8);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={23}
        y={0}
        dy={14}
        fontSize="0.90em"
        fontFamily="muli"
        textAnchor="end"
        fill={color}
      >
        {dateTip}
      </text>
    </g>
  );
};

export default CustomAreaChart;
