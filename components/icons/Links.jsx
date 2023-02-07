import React from "react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";

function Links({ children, href = "/", style = "", clicked = () => {} }) {
  return (
    <Link href={href}>
      <a
        onClick={() => {
          clicked();
          deleteCookie("role");
          deleteCookie("email");
        }}
        className={style}
      >
        {children}
      </a>
    </Link>
  );
}

export default Links;
