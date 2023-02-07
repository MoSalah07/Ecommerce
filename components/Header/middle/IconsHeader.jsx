import React from "react";
import SvgIcons from "../../icons/SvgIcons";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { toggleCart } from "../../../redux/shopping/shopping-cart";

function IconsHeader() {
  const {
    product: { products },
    wishList: { wishList },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handelOpenShoppingCart = () => {
    dispatch(toggleCart());
  };




  return (
    <div className="flex items-center basis-[10%] flex-1 justify-center gap-6">
      <div className="relative">
        <SvgIcons path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        {wishList.length > 0 && (
          <span className="absolute top-[-4px] right-[-9px] w-4 h-4 leading-[1rem] bg-red-500 rounded-full text-white text-center text-sm">
            {wishList.length}
          </span>
        )}
      </div>
      <div className="relative">
        <SvgIcons
          clickMenu={handelOpenShoppingCart}
          path="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />

        {products.length > 0 && (
          <span className="absolute top-[-4px] right-[-9px] w-4 h-4 leading-[1rem] bg-red-500 rounded-full text-white text-center text-sm">
            {products.length}
          </span>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(IconsHeader), { ssr: false });
