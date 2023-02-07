import React from "react";
import Links from "../icons/Links";
import { useSession, signOut } from "next-auth/react";
function Login() {
  const { data: session, status } = useSession();
  return (
    <>
      {session && status === "authenticated" ? (
        <Links
          href="/"
          style="capitalize text-[12px] font-bold border-2 border-gray-500 rounded-full py-1 px-2"
          clicked={() => signOut()}
        >
          logout
        </Links>
      ) : (
        <Links
          href="/login"
          style="capitalize text-[12px] font-bold border-2 border-gray-500 rounded-full py-1 px-2"
        >
          sign in
        </Links>
      )}
    </>
  );
}

export default Login;
