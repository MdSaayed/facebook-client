import React from "react";

const Market = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      id="market"
      width="20" // Set width to 24 units
      height="20" // Set height to 24 units
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M22,5c0,0,0.437,2.806,0.5,3.75c0.119,1.791-1.455,3.25-3.25,3.25S16,10.545,16,8.75
    c0,1.795-1.455,3.25-3.25,3.25S9.381,10.541,9.5,8.75C9.563,7.806,10,5,10,5"
      ></path>
      <line
        x1="16"
        x2="16"
        y1="5"
        y2="9"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      ></line>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M22.5,8.75c0,1.795,1.455,3.25,3.25,3.25s3.483-1.47,3.25-3.25C28.874,7.788,27,5,27,5H5
    c0,0-1.874,2.788-2,3.75C2.767,10.53,4.455,12,6.25,12S9.5,10.545,9.5,8.75"
      ></path>
      <line
        x1="3"
        x2="29"
        y1="27"
        y2="27"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      ></line>
      <rect
        width="14"
        height="8"
        x="9"
        y="15"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      ></rect>
      <line
        x1="27"
        x2="27"
        y1="27"
        y2="12"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      ></line>
      <line
        x1="5"
        x2="5"
        y1="12"
        y2="27"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      ></line>
    </svg>
  );
};

export default Market;
