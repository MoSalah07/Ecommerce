import React from "react";
import ItemListHeader from "./item-list/ItemListHeader";

function ListBottom() {
  const list = ["home", "pages", "mega menu", "blog", "contact"];
  return (
    <nav className="h-full flex items-center justify-center border-b border-t py-3 relative z-20">
      <ul className="flex items-center gap-4 h-full">
        {list &&
          list.map((item, index) => <ItemListHeader key={index} item={item} />)}
      </ul>
    </nav>
  );
}

export default ListBottom;
