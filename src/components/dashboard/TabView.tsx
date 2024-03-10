import React, { useState } from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { IChartDatum, TTab } from "../../interfaces";
import Stats from "./Stats";
import { GetListResponse } from "@refinedev/core";

type TTabViewProps = {
  tabs: TTab[];
  dailyRevenue?: GetListResponse<IChartDatum>;
  dailyOrders?: GetListResponse<IChartDatum>;
  newCustomers?: GetListResponse<IChartDatum>;
};

export const TabView = ({
  tabs,
  dailyOrders,
  dailyRevenue,
  newCustomers,
}: TTabViewProps) => {};
