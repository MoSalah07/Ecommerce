import React from "react";
import Categories from "./categories/Categories";
import Brands from "./Brands";
import Colors from "./Colors";

import Price from "./Price";
import Banner from "./Banner";
import getView from "../../helper/ViewPort";
import { useState } from "react";

function Aside({ lists: { colors, categories, brands } }) {
  const width = getView();

  return (
    <aside className="basis-[15%] ">
      {width > 767 ? (
        <>
          <Categories categories={categories} />
          <Brands brands={brands} />
          <Price />
          <Colors colors={colors} />

          <Banner />
        </>

      ) : <>
          <Categories categories={categories} />

      </>}
    </aside>
  );
}

export default Aside;
