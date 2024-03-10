import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};

export const ResponsiveAreaChart = ({
  kpi,
  data,
  colors,
}: TResponsiveAreaChartProps) => {
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        data={data}
        height={150}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="0 0 0"
          stroke="#F5F5F5"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tickCount={data?.length ?? 0}
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "#676767",
            strokeWidth: 0.2,
            fontSize: "12px",
            fontWeight: 400,
          }}
        />
        <YAxis
          tickCount={13}
          axisLine={false}
          tickLine={false}
          tick={{
            stroke: "#676767",
            strokeWidth: 0.2,
            fontWeight: 400,
            fontSize: "12px",
          }}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
        />
        <Tooltip
          cursor={true}
          content={<ChartTooltip kpi={kpi} colors={colors} />}
        />
        <Line
          activeDot={false}
          dot={false}
          type="monotoneX"
          dataKey={"value"}
        ></Line>
      </LineChart>
    </ResponsiveContainer>
  );
};
