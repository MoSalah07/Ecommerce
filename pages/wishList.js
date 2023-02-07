import React from "react";
import Layout from "../components/layout/Layout";
import Wish from "../components/wish/Wish";

function wishList() {
  return (
    <Layout title="Wishlist">
      <Wish />
    </Layout>
  );
}

export default wishList;
