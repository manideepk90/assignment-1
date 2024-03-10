import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { IChartDatum, TTab } from "../../interfaces";
import "./dashboard.css";
import Stats from "../../components/dashboard/Stats";

export const Dashboard: React.FC = () => {
  const [filters, setFilters]: [CrudFilter[], any] = useState([
    {
      field: "start",
      operator: "eq",
      value: dayjs()?.subtract(7, "days")?.startOf("month"),
    },
    {
      field: "end",
      operator: "eq",
      value: dayjs().startOf("day"),
    },
  ]);

  const { data: stores } = useList<IChartDatum>({
    resource: "stores",
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };
  const memorizedOrdersData = useMemoizedChartData(dailyOrders);
  const tabs: TTab = {
    id: 0,
    label: "Daily orders",
    content: (
      <ResponsiveLineChart
        kpi="Daily Orders"
        data={memorizedOrdersData}
        colors={{
          stroke: "rgb(54, 162, 235)",
          fill: "rgba(54, 162, 235, 0.2)",
        }}
      />
    ),
    colors: {
      stroke: "rgb(54, 162, 235)",
      fill: "rgba(54, 162, 235, 0.2)",
    },
  };
  const [expand, setExpand] = useState(true);
  const handleExpansion = (e: any) => {
    setExpand((p) => !p);
  };
  return (
    <div className="tab-panel">
      <Stats
        expanded={expand}
        handleExpansion={handleExpansion}
        dailyRevenue={stores}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
      <div
        className="w-full"
        style={{
          display: expand ? "flex" : "none",
        }}
      >
        {tabs?.content}
      </div>
      <div
        className="legend"
        style={{
          display: expand ? "flex" : "none",
        }}
      >
        <div className="legend-1">
          <div
            className="label-icon"
            style={{
              border: `1px solid ${tabs.colors?.stroke}`,
              backgroundColor: tabs.colors?.fill,
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <p className="date-label">{tabs.label}</p>
        </div>
        <div className="legend-1">
          <div
            className="label-icon"
            style={{
              border: `1px solid ${tabs.colors?.stroke}`,
              backgroundColor: tabs.colors?.fill,
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <p className="date-label">{tabs.label}</p>
        </div>
      </div>
    </div>
  );
};
