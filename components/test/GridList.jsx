import React, { cloneElement } from "react";

function GridList({ children, item }) {
  const randerItems = item.map((el, idx) =>
    cloneElement(children, { key: el.id, idxNum: idx, ...el })
  );
  return (
    <div className="container mx-auto">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {randerItems}
      </div>
    </div>
  );
}

export default GridList;
