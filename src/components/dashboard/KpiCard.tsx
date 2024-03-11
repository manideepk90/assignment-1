import React, { useEffect, useRef, useState } from "react";

type TKpiCardProps = {
  title: string;
  description?: string;
  data: any;
  formatTotal?: (value: number | string) => typeof value;
  menu?: string[];
};

export const KpiCard = ({
  title,
  data,
  description,
  menu,
  formatTotal = (value) => value,
}: TKpiCardProps) => {
  const total = data?.data?.total;
  const trend = data?.data?.trend;
  const calc = Math.round((trend / total) * 100);
  const percent = total > trend ? `${calc}%` : `- ${calc}%`;

  const [showDescription, setShowDescription] = useState(false);
  const [showEditSettings, setShowEditSettings] = useState(false);
  const handleMouseEnter = () => setShowDescription(true);
  const handleMouseLeave = () => setShowDescription(false);
  const menuRef = useRef(null);
  const descriptionStyle = {
    display: showDescription ? "block" : "none",
  };

  const editSettingStyle = {
    display: showEditSettings ? "block" : "none",
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        showEditSettings &&
        menuRef.current &&
        (event.target as HTMLElement).contains(menuRef.current)
      ) {
        setShowEditSettings(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showEditSettings]);
  const Element = total ? (
    <div className="stat-card" ref={menuRef}>
      <div
        className="stat-title"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </div>
      <div className="stat-description" style={descriptionStyle}>
        <p className="desc-title">{title}</p>{" "}
        <p className="desc">{description}</p>
      </div>
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
      <div
        className="edit-icon"
        onClick={() => {
          setShowEditSettings(() => true);
        }}
      >
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
      {menu && (
        <div className="edit-settings" style={editSettingStyle}>
          {menu?.map((e: string, i: number) => (
            <EditItems key={i} isActive={e === title}>
              {e}
            </EditItems>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="stat-loading">
      <div className="stat-title-loading"></div>
      <div className="stat-value-loading"></div>
    </div>
  );

  return Element;
};

const EditItems = ({
  isActive,
  children,
}: {
  children: string;
  isActive?: boolean;
}) => {
  return (
    <div className={`edit-item ${isActive ? "active" : ""}`}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.25 8.0625C1.25 8.23828 1.38672 8.375 1.5625 8.375H9.375C9.70703 8.375 10 8.66797 10 9C10 9.35156 9.70703 9.625 9.375 9.625H1.5625C0.683594 9.625 0 8.94141 0 8.0625V1.5C0 1.16797 0.273438 0.875 0.625 0.875C0.957031 0.875 1.25 1.16797 1.25 1.5V8.0625ZM6.67969 5.69922C6.44531 5.95312 6.03516 5.95312 5.80078 5.69922L4.6875 4.58594L2.92969 6.32422C2.69531 6.57812 2.28516 6.57812 2.05078 6.32422C1.79688 6.08984 1.79688 5.67969 2.05078 5.44531L4.23828 3.25781C4.47266 3.00391 4.88281 3.00391 5.11719 3.25781L6.25 4.37109L8.30078 2.32031C8.53516 2.06641 8.94531 2.06641 9.17969 2.32031C9.43359 2.55469 9.43359 2.96484 9.17969 3.19922L6.67969 5.69922Z"
          fill="#616161"
        />
      </svg>

      <p>{children}</p>
      <svg
        width="10"
        className="help-icon"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 0.25C7.75391 0.25 10 2.49609 10 5.25C10 8.02344 7.75391 10.25 5 10.25C2.22656 10.25 0 8.02344 0 5.25C0 2.49609 2.22656 0.25 5 0.25ZM5 9.3125C7.22656 9.3125 9.0625 7.49609 9.0625 5.25C9.0625 3.02344 7.22656 1.1875 5 1.1875C2.75391 1.1875 0.9375 3.02344 0.9375 5.25C0.9375 7.49609 2.75391 9.3125 5 9.3125ZM5 6.8125C5.33203 6.8125 5.625 7.08594 5.625 7.4375C5.625 7.78906 5.33203 8.0625 5 8.0625C4.62891 8.0625 4.375 7.78906 4.375 7.4375C4.375 7.08594 4.64844 6.8125 5 6.8125ZM5.64453 2.75C6.42578 2.75 7.03125 3.35547 7.01172 4.11719C7.01172 4.58594 6.75781 5.03516 6.34766 5.28906L5.46875 5.83594V5.875C5.46875 6.12891 5.25391 6.34375 5 6.34375C4.74609 6.34375 4.53125 6.12891 4.53125 5.875V5.5625C4.53125 5.40625 4.60938 5.25 4.76562 5.15234L5.87891 4.48828C6.01562 4.41016 6.09375 4.27344 6.09375 4.11719C6.09375 3.88281 5.87891 3.6875 5.625 3.6875H4.62891C4.39453 3.6875 4.21875 3.88281 4.21875 4.11719C4.21875 4.37109 4.00391 4.58594 3.75 4.58594C3.49609 4.58594 3.28125 4.37109 3.28125 4.11719C3.28125 3.35547 3.88672 2.75 4.64844 2.75H5.64453Z"
          fill="#616161"
        />
      </svg>
    </div>
  );
};
