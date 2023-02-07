
import NavContent from "./NavContent";
import ProductBox from "./ProductBox";
import ShoppingCart from '../shopping-cart/ShoppingCart';
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSession } from 'next-auth/react';


function Content({products, pagination}) {
  const { data: session } = useSession();

  // const {wishList: {wishList}  } = useSelector( state => state );


  return (
    <div className="flex-1 basis-[80%]">
      <NavContent pagination={pagination} />
      <div className=" w-full px-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <ProductBox key={product.id} item={product} session={session} />
          ) )}
      </div>
    </div>
  );
}

export default Content;
