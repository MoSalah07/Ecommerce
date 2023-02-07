import React from "react";

function ItemGrid({ title, category, description, idxNum }) {
  return (
    <div className="bg-red-200 p-4">
      <small className="block font-bold mb-4">{idxNum + 1}</small>
      <span>{title}</span>
      <p className="my-4">{category}</p>
      <p>{description}</p>
    </div>
  );
}

export default ItemGrid;
