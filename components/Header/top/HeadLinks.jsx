import React from "react";
import Links from "../../icons/Links";
import SvgIcons from "../../icons/SvgIcons";
import { useSession, signOut } from "next-auth/react";


function HeadLinks() {
  const { data: session, status } = useSession();
  // console.log(session, status);

  const myLinks = [
    {
      name: "my account",
      path: "profile",
    },
    {
      name: "wishlist",
      path: "wishList",
    },
    {
      name: "checkout",
      path: "checkout",
    },
    {
      name: "wishlist",
      path: "/",
    },
    {
      name: "logout",
      path: "/",
    },
  ];

  return (
    <nav className="flex gap-3">
      {session && status === "authenticated" ? (
        <>
          <Links
            href="/profile"
            style="text-gray-400 text-sm duration-100 transition-all hover:text-black hover:font-bold flex items-center gap-1"
          >
            <SvgIcons path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            my account
          </Links>
          <Links
            href="/wishList"
            style="text-gray-400 text-sm duration-100 transition-all hover:text-black hover:font-bold flex items-center gap-1"
          >
            <SvgIcons path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            wishlist
          </Links>
          <Links
            href="/checkout"
            style="text-gray-400 text-sm duration-100 transition-all hover:text-black hover:font-bold flex items-center gap-1"
          >
            <SvgIcons path="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            checkout
          </Links>

          <Links
            href="/"
            style="text-gray-400 text-sm duration-100 transition-all hover:text-black hover:font-bold flex items-center gap-1"
            // Here Delete Cookies From LogOut OnClick Inside Component Links
            clicked={ signOut}
          >
            <SvgIcons path="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            logout
          </Links>
        </>
      ) : (
        <Links
          href="/login"
          style="text-gray-400 text-sm duration-100 transition-all hover:text-black hover:font-bold flex items-center gap-1"
        >
          login
          <SvgIcons path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </Links>
      )}
    </nav>
  );
}

export default HeadLinks;
