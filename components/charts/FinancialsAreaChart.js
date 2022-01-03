import React, { Fragment } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const FinancialsAreaChart = ({ data }) => {
  const { theme } = useTheme();

  const color = theme == 'light' ? 'black' : 'white';

  return (
    <Fragment>
      {/* </div> */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          // height={400}
          width={1300}
          data={data}
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
                stopColor={theme == 'light' ? '#b7e1c2' : '#2451B7'}
                stopOpacity={theme == 'light' ? 1 : 0.4}
              />
              <stop
                offset={theme == 'light' ? '85%' : '75%'}
                stopColor={theme == 'light' ? '#D1FAE5' : '#2451B7'}
                stopOpacity={theme == 'light' ? 0.1 : 0.05}
              />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey={'amt'}
            stroke={theme == 'light' ? '#03e08b' : '#2451B7'}
            fill="url(#color)"
            strokeWidth={1.6}
          />

          <XAxis color={color} dataKey="date" reversed tick={CustomizedAxisTick} />
          <YAxis dataKey={'amt'} orientation="right" fontSize={11} width={40} />
          <Tooltip ty content={<CustomTooltip />} />
          {/* <Brush fill={theme == "light" ? "#EFF6FF" : "#111827"} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Fragment>
        <div className="bg-gray-800 p-2 text-white shadow-md">
          <p className="text-xs">{`Particular : ${payload[0].payload.name}`}</p>
          <p className="text-xs">{`Year : ${label}`}</p>
          <p className="text-xs">
            {/* {moment(new Date(label)).format("DD MMM YYYY").slice(0)} */}
            {`Amount : ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      </Fragment>
    );
  }

  return null;
};

const CustomizedAxisTick = ({ x, y, payload, color }) => {
  const dateTip = payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={23} y={0} dy={14} fontSize="0.90em" fontFamily="muli" textAnchor="end" fill={color}>
        {dateTip}
      </text>
    </g>
  );
};

export default FinancialsAreaChart;
