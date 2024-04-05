import React from "react";

const NotificationIcon = ({ color }) => {
  return (
    <svg
      fill={color} // Fill color can be dynamic
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="20" // Set width to 20 units
      height="20" // Set height to 20 units
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M10,20h4a2,2,0,0,1-4,0Zm8-4V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v6L4,18H20Z"></path>
      </g>
    </svg>
  );
};

export default NotificationIcon;
