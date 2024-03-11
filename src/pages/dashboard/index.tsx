import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import { ResponsiveLineChart } from "../../components/dashboard/ResponsiveLineChart";
import { IChartDatum, TTab } from "../../interfaces";
import "./dashboard.css";
import Stats from "../../components/dashboard/Stats";
import dateFormat from "dateformat";
export const Dashboard: React.FC = () => {
  const [filters, setFilters]: [CrudFilter[], any] = useState([
    {
      field: "start",
      operator: "eq",
      value: dayjs()?.subtract(1, "months")?.startOf("month"),
    },
    {
      field: "end",
      operator: "eq",
      value: dayjs().startOf("day"),
    },
  ]);

  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any, d2: any) => {
    return useMemo(() => {
      const data = d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "2-digit",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
      const data1 = d2?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "2-digit",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
      const combinedData =
        data &&
        data1 &&
        [
          ...data1.map((item: IChartDatum) => ({
            date: item.date,
            value: data.find((d: IChartDatum) => d.date === item.date)?.value,
            value2: item.value,
          })),
        ].sort(
          (a: IChartDatum, b: IChartDatum) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      return combinedData;
    }, [d]);
  };
  const memorizedCustomersData = useMemoizedChartData(
    newCustomers,
    dailyOrders
  );
  // const memorizedOrdersData = useMemoizedChartData(dailyOrders);
  const tabs: TTab = {
    id: 0,
    label: "Daily orders",
    content: (
      <ResponsiveLineChart
        kpi="Daily Orders"
        combinedData={memorizedCustomersData}
        // data={memorizedOrdersData}
        // data1={}
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
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
      <div
        className="w-full"
        style={{
          display: expand ? "block" : "none",
        }}
      >
        <div className="flex justify-center items-center">
          <div className="relative">
            <input
              name="start"
              value={dateFormat(filters[0].value?.toDate(), "yyyy-mm-dd")}
              onChange={(e) => {
                setFilters((p: CrudFilter[]) => {
                  return [{ ...p[0], value: dayjs(e.target.value) }, p[1]];
                });
              }}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <input
              name="end"
              value={dateFormat(filters[1].value?.toDate(), "yyyy-mm-dd")}
              onChange={(e) =>
                setFilters((p: CrudFilter[]) => {
                  return [
                    p[0],
                    {
                      ...p[1],
                      value: dayjs(e.target.value),
                    },
                  ];
                })
              }
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date end"
            />
          </div>
        </div>
        <div></div>
      </div>
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
          <p className="date-label">{`${dateFormat(
            filters[0].value.toDate(),
            "mmm dd, yyyy"
          )} - ${dateFormat(filters[1].value.toDate(), "mmm dd, yyyy")}`}</p>
        </div>
        <div className="legend-1">
          <div
            className="label-icon"
            style={{
              border: `1px dashed ${tabs.colors?.stroke}`,
              backgroundColor: tabs.colors?.fill,
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <p className="date-label">{`${dateFormat(
            filters[0].value.toDate(),
            "mmm dd, yyyy"
          )} - ${dateFormat(filters[1].value.toDate(), "mmm dd, yyyy")}`}</p>
        </div>
      </div>
    </div>
  );
};
