import { useState, useCallback } from "react";
import Links from "../../icons/Links";
import { handelPageNavigate } from "../../../lib/handelPageNavigate";
import { useRouter } from "next/router";

function ListCategories({ category }) {
  // console.log(el)
  const subList = ["category 1", "category 2", "category 3", "category 4"];
  const [isShow, setIsShow] = useState( false );
  const [tabs, setTabs] = useState( '' );
  const toggleShow = () => setIsShow(!isShow);
  const router = useRouter();

  function handelMovePage(tab) {
    // toggleShow();
    handelPageNavigate( "category", category, router);
    setTabs( tab )
  }

  return (
    // <Links href={`/search/?query${el}`}>
    <li
      className={`select-none cursor-pointer relative p-2
       hover:bg-gray-200 transition-colors`}
      onClick={() => handelMovePage(category)}
    >
      <span className="text-xs font-semibold tracking-wide" >{category}</span>
      <ul
        style={{
          height: isShow ? "100px" : "auto",
          display: isShow ? "block" : "none",
          transition: "all .3s ease-in-out",
        }}
        className="pl-4 mt-2"
      >
        {subList.map((el, key) => (
          <li
            className={`text-[11px] tracking-wide mb-2 font-bold text-gray-800`}
            key={key}
          >
            {el}
          </li>
        ))}
      </ul>
    </li>
    // </Links>
  );
}

export default ListCategories;
