import React from "react";

type TKpiCardProps = {
  title: string;
  data: any;
  formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
  title,
  data,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `${calc}%` : `- ${calc}%`;
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">
        {formatTotal(total ?? "...")}
        <div className="stat-desc ">
          <svg
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.550781 3.44531L3.03125 0.945312C3.16797 0.828125 3.32422 0.75 3.5 0.75C3.65625 0.75 3.8125 0.828125 3.92969 0.945312L6.41016 3.44531C6.58594 3.62109 6.64453 3.89453 6.54688 4.12891C6.44922 4.36328 6.23438 4.5 5.98047 4.5H1C0.746094 4.5 0.511719 4.36328 0.414062 4.12891C0.316406 3.89453 0.375 3.62109 0.550781 3.44531Z"
              fill="#616161"
            />
          </svg>
          {percent}
        </div>
      </div>
      <div className="edit-icon">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6895 10.2363L9.77344 16.1523L8.91016 15.2891L9.01172 15.1875H7.84375C7.61523 15.1875 7.4375 15.0098 7.4375 14.7812V13.6133L7.33594 13.7148C7.20898 13.8418 7.13281 13.9688 7.08203 14.1465L6.49805 16.127L8.47852 15.543C8.63086 15.4922 8.7832 15.416 8.91016 15.2891L9.77344 16.1523C9.51953 16.4062 9.18945 16.6094 8.83398 16.7109L5.76172 17.5996C5.55859 17.6758 5.33008 17.625 5.17773 17.4473C5 17.2949 4.94922 17.0664 5 16.8633L5.91406 13.791C6.01562 13.4355 6.21875 13.1055 6.47266 12.8516L12.3887 6.93555L15.6895 10.2363ZM17.4922 6.12305C18.127 6.75781 18.127 7.79883 17.4922 8.43359L16.2734 9.65234L12.9727 6.35156L14.1914 5.13281C14.8262 4.49805 15.8672 4.49805 16.502 5.13281L17.4922 6.12305Z"
            fill="black"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
};
