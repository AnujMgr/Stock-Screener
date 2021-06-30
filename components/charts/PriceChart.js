import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useTheme } from "next-themes";

const PriceChart = ({ timeSpan }) => {
  const { theme } = useTheme();
  const strokeColor = theme == "light" ? "#03e08b" : "white";
  const fillColor = theme == "light" ? "#cdf9e8" : "black";
  const color = theme == "light" ? "black" : "white";

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=demo"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <h1>Loading....</h1>;
  } else {
    const data = items.historical;
    data.length = timeSpan;
    data.splice(timeSpan);

    return (
      <Fragment>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            height={400}
            width={1300}
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 0" /> */}
            <XAxis
              color={color}
              dataKey="date"
              reversed
              tick={CustomizedAxisTick}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke={strokeColor}
              fill={fillColor}
            />
            <Brush fill={fillColor} />
          </AreaChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
};

const CustomTooltip = ({ active, payload, label }) => {
  const { theme } = useTheme();
  const bg = theme == "light" ? "black" : "white";

  if (active && payload != undefined) {
    return (
      <Fragment>
        {payload.map(({ value, name, color }) => {
          return (
            <div key={value} className="bg-gray-800 p-2 text-white">
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
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
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

export default PriceChart;
