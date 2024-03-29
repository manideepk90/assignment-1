import React from "react";
import "./chart.css";

const ToolTip = ({
  payload,
  colors,
  label,
}: {
  payload: string;
  colors: {
    fill: string;
    stroke: string;
  };
  label: string;
}) => {
  return (
    <>
      <div className="custom-tooltip-1">
        <div
          className="label-icon"
          style={{
            border: `1px solid ${colors?.stroke}`,
            backgroundColor: colors?.fill,
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <p className="label">{label}</p>
        <p className="value">{`${payload}`}</p>
        {/* trend data can be added */}
        {/* <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.875 1.875C7.52344 1.875 7.25 1.60156 7.25 1.25C7.25 0.917969 7.52344 0.625 7.875 0.625H11C11.332 0.625 11.625 0.917969 11.625 1.25V4.375C11.625 4.72656 11.332 5 11 5C10.6484 5 10.375 4.72656 10.375 4.375V2.77344L7.05469 6.07422C6.82031 6.32812 6.41016 6.32812 6.17578 6.07422L4.10547 4.02344L1.42969 6.69922C1.19531 6.95312 0.785156 6.95312 0.550781 6.69922C0.296875 6.46484 0.296875 6.05469 0.550781 5.82031L3.67578 2.69531C3.91016 2.44141 4.32031 2.44141 4.55469 2.69531L6.625 4.74609L9.47656 1.875H7.875Z"
            fill="#616161"
          />
        </svg> */}
        {/* <p className="changes">{`${dataPoint.value1}`}</p> */}
      </div>
    </>
  );
};

export const ChartTooltip = ({
  active,
  payload,
  label,
  coordinate,
  colors,
  kpi,
}: any) => {
  if (active && payload && payload.length) {
    const tooltipStyle = {
      left: coordinate.x, // Adjust positioning
      top: coordinate.y, // Adjust positioning
    };
    return (
      <div className="custom-tooltip" style={tooltipStyle}>
        <ToolTip
          payload={payload[0].payload.value || 0}
          label={label}
          colors={colors}
        />
        <ToolTip
          payload={payload[0].payload.value2 || 0}
          label={label}
          colors={colors}
        />
      </div>
    );
  }

  return null;
};
