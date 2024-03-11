import React, { MouseEventHandler } from "react";
import { KpiCard } from "./KpiCard";
import { IChartDatum } from "../../interfaces";
import { GetListResponse } from "@refinedev/core";

type TStats = {
  expanded: Boolean;
  handleExpansion: MouseEventHandler;
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
};

const Stats = ({
  handleExpansion,
  dailyRevenue,
  dailyOrders,
  newCustomers,
  expanded,
}: TStats) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex flex-start items-center">
        <KpiCard
          title="Online store sessions"
          data={dailyRevenue}
          formatTotal={(value: number | string) => `${value}`}
        />
        <KpiCard
          title="Net return value"
          data={dailyOrders}
          formatTotal={(value: number | string) => `$ ${value}`}
        />
        <KpiCard
          title="Total orders"
          data={newCustomers}
          formatTotal={(value: number | string) => `$ ${value}`}
        />
        <KpiCard
          title="Conversion rate"
          data={newCustomers}
          formatTotal={(value: number | string) => `$ ${value}`}
        />
      </div>

      <div
        className="expand-button"
        style={{
          transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        <svg
          width="25"
          height="18"
          viewBox="0 0 25 18"
          onClick={handleExpansion}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 12.75C12.2891 12.75 12.1016 12.6797 11.9609 12.5391L7.46094 8.03906C7.15625 7.75781 7.15625 7.26562 7.46094 6.98438C7.74219 6.67969 8.23438 6.67969 8.51562 6.98438L12.5 10.9453L16.4609 6.98438C16.7422 6.67969 17.2344 6.67969 17.5156 6.98438C17.8203 7.26562 17.8203 7.75781 17.5156 8.03906L13.0156 12.5391C12.875 12.6797 12.6875 12.75 12.5 12.75Z"
            fill="black"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Stats;
