import React, { useState, useEffect } from "react";
import SvgIcons from "../../icons/SvgIcons";
import DropHeader from "../DropHeader";
import classes from "./headerTop.module.css";
import { useSelector, useDispatch } from "react-redux";

function HeadList() {
  const langList = ["english", "french", "german", "arabic"];
  const currancyList = ["USD", "EGP", "EUR"];
  const [curr, setCurr] = useState("");
  const {
    product: { products },
    currency: { currency },
  } = useSelector((state) => state);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurr(JSON.parse(localStorage.getItem("currency")) || "USD");
    }
  }, [currency]);

  return (
    <nav className={classes.nav}>
      <ul className="flex items-center gap-8 relative">
        <li className="text-sm cursor-pointer">
          english
          <DropHeader styleLeft="0px" item={langList} />
        </li>
        <li className="text-sm cursor-pointer">
          {curr}
          <DropHeader styleLeft="63px" item={currancyList} />
        </li>
        <li className="flex items-center gap-1 text-sm cursor-pointer">
          <SvgIcons
            width="w-4"
            height="h-4"
            path="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
          <span>+1 (111) 426 6573</span>
        </li>
      </ul>
    </nav>
  );
}

export default HeadList;
