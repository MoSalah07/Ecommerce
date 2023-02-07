import React from "react";
import Links from "../../icons/Links";

function NavHeaderMedia({ isOpen }) {
  return (
    <nav
      style={{
        clipPath: isOpen
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 0, 0 0)",
        transition: ".3s ease-in-out",
      }}
      className="absolute left-0 top-[72px] z-50 bg-white w-full h-auto p-4"
    >
      <ul>
        <li className="border-t border-b border-gray-200 p-2 cursor-pointer transition-colors hover:bg-blue-400 hover:text-white"><Links style="w-full block h-full " href="/">home</Links></li>
        <li className="border-t border-b border-gray-200 p-2 cursor-pointer transition-colors hover:bg-blue-400 hover:text-white"><Links style=" w-full block h-full " href="/">pages</Links></li>
        <li className="border-t border-b border-gray-200 p-2 cursor-pointer transition-colors hover:bg-blue-400 hover:text-white"><Links style=" w-full block h-full " href="/profile">profile</Links></li>
        <li className="border-t border-b border-gray-200 p-2 cursor-pointer transition-colors hover:bg-blue-400 hover:text-white"><Links style=" w-full block h-full" href="/">contact</Links></li>
      </ul>
    </nav>
  );
}

export default NavHeaderMedia;
