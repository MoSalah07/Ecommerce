import React from "react";
import Image from "next/image";
import SvgIcons from "../icons/SvgIcons";
import classes from "./productBox.module.css";
import Links from "../icons/Links";
import { addToCart } from "../../redux/getData/SliceProduct";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import convertCurrency from "../../lib/convertCurrency";
import { addToWishList } from "../../redux/getData/sliceWishList";
import axios from "axios";
import { showCart } from "../../redux/shopping/shopping-cart";


function ProductBox({
  item: {
    category,
    description,
    id,
    image,
    price,
    rating: { rate, count },
    title,
    inStock,
  },
  item,
  session,
}) {
  const dispatch = useDispatch();
  const [convertPrice, setCovertPrice] = useState( "" );

  
  

  const {
    currency: { currency },
    product: { products },
    wishList: {wishList}
  } = useSelector((state) => state);

  const fillRed = wishList.findIndex( ( el ) => el.id === id );
  // console.log(fillRed)

  const handelPrice = async (amount, currency) => {
    const price = await convertCurrency(amount, currency);
    setCovertPrice(price);
  };

  useEffect(() => {
    handelPrice(price, currency);
  }, [currency]);

  const handelAddToCart = () => {

    const existItem = products.find((el) => el.id === id);
    const quantity = existItem ? existItem.qty + 1 : 1;

    if (quantity > inStock) {
      toast.warning("Sorry, Product Is out of stock !", { autoClose: 800 });
      return;
    }

    dispatch(showCart(true));
    toast.success("Item Done Now!", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch(addToCart({...item, qty: quantity}));
  };

  const handelAddToWishList = async () => {
    try {
      const { data } = await axios.post(`/api/user/addWishList`, { ...item });
      // console.log(data)
    } catch (err) {
      console.log(err.message);
    }

    dispatch(addToWishList(item));
    toast.success("Add To WishList!", {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div
      className={`relative w-full h-[auto] rounded-lg overflow-hidden ${classes.product_box} border-[.5px] border-gray-200 `}
    >
      {/* Top */}
      <div>
        <Links href={`/product-details/${id}`}>
          <Image
            src={image || ""}
            alt={title}
            width={250}
            height={250}
            layout="responsive"
            priority
          ></Image>
        </Links>

        <div className="absolute right-[-40px] top-[40px] transition-all grid gap-3 p-1">
          <SvgIcons path="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          <SvgIcons path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </div>
      </div>
      {/* Middle */}
      <div className="p-2 bg-gray-100 h-[150px] overflow-auto">
        <h5 className="text-md">{title}</h5>
        <p className="my-4 text-xs">{description}</p>
        <p className="text-yellow-400">&#9733;&#9733;&#9733;&#9733;</p>
      </div>
      {/* Bottom */}
      <div className="p-2">
        <div className="flex items-center justify-between py-2 ">
          <b>{convertPrice || price}</b>
          <div className="flex items-center justify-center gap-2 ">
            {session && (
              <SvgIcons
                clickMenu={handelAddToWishList}
                classStyle="cursor-pointer"
                path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                fill={fillRed !== -1  && 'red'}
              />
            )}

            <SvgIcons
              clickMenu={handelAddToCart}
              classStyle="cursor-pointer"
              path="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ProductBox;
