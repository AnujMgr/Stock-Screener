import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
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
    ratio: 22,
  },
];

const MicroChart = () => {
  const { theme } = useTheme();

  return (
    <AreaChart height={50} width={100} data={data} className="ml-auto">
      <defs>
        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={theme == "light" ? "#FBBF24" : "#2451B7"}
            stopOpacity={0.9}
          />
          <stop
            offset="85%"
            stopColor={theme == "light" ? "#D1FAE5" : "#2451B7"}
            stopOpacity={0.3}
          />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="ratio"
        stroke={theme == "light" ? "#FBBF24" : "#1D4ED8"}
        fill="url(#color)"
      />
    </AreaChart>
  );
};

export default MicroChart;
