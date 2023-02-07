import React from "react";
import TitleAside from "../TitleAside";

import ListCategories from "./ListCategories";

function Categories({ categories }) {
  return (
    <div className="" >
      <TitleAside title="Categories" />
      <ul
        className="flex flex-col gap-2 mt-4 capitalize  transition-all"
      >
        {categories.map((el, key) => (
          <ListCategories key={key} category={el} />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
