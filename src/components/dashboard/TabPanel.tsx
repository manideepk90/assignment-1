import React from "react";

type TTabPanelProps = {
  isActive: boolean;
  children: JSX.Element;
};

export const TabPanel = ({ isActive, children }: TTabPanelProps) => {
  return isActive ? <div className="w-full">{children}</div> : null;
};
