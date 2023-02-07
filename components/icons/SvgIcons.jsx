import React from "react";

function SvgIcons({
  path,
  classStyle = "",
  clickMenu = null,
  width = "w-5",
  height = "h-5",
  fill = "none",
}) {
  return (
    <svg
      onClick={clickMenu}
      xmlns="http://www.w3.org/2000/svg"
      // fill={fill}
      fill={typeof fill === "string" ? fill : "none"}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${width} ${height} ${classStyle}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default SvgIcons;
