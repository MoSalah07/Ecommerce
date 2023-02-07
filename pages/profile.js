import React from "react";
import { getSession } from "next-auth/react";
import ProfileContent from "../components/profile/ProfileContent";
import ListProfile from "../components/profile/ListProfile";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

function Profile() {
  const {
    query: { orders },
  } = useRouter();
  const [choice, setChoice] = useState("profile");

  //  For If USer Come From CheckOut And Add Order See First Page Component Orders
  useEffect(() => {
    if (!orders) return;
    setChoice(orders);
  }, [orders]);

  return (
    <Layout title="Profile">
      <div className=" min-h-[70vh] container mx-auto px-2 md:px-8 pt-8 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
        <ListProfile setChoice={setChoice} choice={choice} />
        <ProfileContent choice={choice} />
      </div>
    </Layout>
  );
}

export default Profile;
