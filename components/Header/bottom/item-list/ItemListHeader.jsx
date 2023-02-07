import React from "react";
import Link from "next/link";

function ItemListHeader({ item }) {
  return (
    <li className="cursor-pointer text-base text-gray-500 relative z-20">
      <Link href={`/`}>{item}</Link>
    </li>
  );
}

export default ItemListHeader;
