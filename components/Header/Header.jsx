import React, { useEffect, useState } from "react";
import HeaderBottom from "./bottom/HeaderBottom";
import HeaderMiddle from "./middle/HeaderMiddle";
import HeaderTop from "./top/HeaderTop";
import ViewPort from "../../helper/ViewPort";
import HeaderMedia from "./HeaderMedia";
import SvgIcons from "../icons/SvgIcons";
import Login from "./Login";
import NavHeaderMedia from "./top/NavHeaderMedia";
import { useSession } from "next-auth/react";
import ShoppingCart from "../shopping-cart/ShoppingCart";
function Header() {
  const width = ViewPort();
  const [isOpen, setIsOpen] = useState(false);

  // ShopingCart Component
  const [open, setOpen] = useState(false);

  const objOpen = { open, setOpen };

  const toggleOpen = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   if ( typeof window == "undefined" ) return;
  //   if (typeof window !== "undefined") {
  //     console.log(window.scrollY)
  //   }
  // }, [])

  return (
    <>
      {width < 767 ? (
        <header className="container h-[10vh] flex items-center justify-between p-4 capitalize z-0">
          {isOpen ? (
            <>
              <SvgIcons
                classStyle="cursor-pointer"
                clickMenu={toggleOpen}
                path="M6 18L18 6M6 6l12 12"
              />
            </>
          ) : (
            <>
              <SvgIcons
                clickMenu={toggleOpen}
                classStyle="cursor-pointer"
                path="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </>
          )}

          <HeaderMedia />
          <Login />
          <NavHeaderMedia isOpen={isOpen} />
        </header>
      ) : (
        <header className="container z-0 mx-auto w-full lg:max-w-6xl lg:h-[25vh] p-2 capitalize flex flex-col gap-4 relative ">
          <HeaderTop />
          <HeaderMiddle />
          <HeaderBottom />
          <ShoppingCart toggleOpen={{ ...objOpen }} />
        </header>
      )}
    </>
  );
}

export default Header;
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-6 h-6"
>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>;
