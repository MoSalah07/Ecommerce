import Reac, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import convertCurrency from "../../lib/convertCurrency";
import Links from "../icons/Links";
import { VscChromeClose } from "react-icons/vsc";
import { toggleCart } from "../../redux/shopping/shopping-cart";
import { addToCart } from "../../redux/getData/SliceProduct";
import { toast } from "react-toastify";

function WishItem({
  item: { brand, category, color, image, title, price, id },
  item,
  removeElement,
}) {
  const {
    currency: { currency },
    "Shopping-Cart": { show },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [currencyPrice, setCurrencyPrice] = useState("");

  const handelPrice = async () => {
    try {
      const finalPriceWithCurrency = await convertCurrency(price, currency);
      setCurrencyPrice(finalPriceWithCurrency);
    } catch (err) {}
  };


  const handelAddBtn = (e) => {
    e.preventDefault();

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
    dispatch( addToCart( item ) );
    dispatch( toggleCart() );
  }

  useEffect(() => {
    handelPrice();
  }, [currency]);

  return (
    <div className="flex relative flex-col rounded-lg p-4 shadow-2xl ">
      <div className="w-full ">
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          priority
          layout="responsive"
        />
      </div>
      {/* Icon Close */}
      <div
        onClick={() => removeElement(id, item)}
        className="absolute right-[15px] cursor-pointer"
      >
        <VscChromeClose className="cursor-pointer" />
      </div>

      <div className="mt-10 grid gap-3 py-3 capitalize">
        <h3 className="text-md break-words my-2 text-gray-600 min-h-[50px]">
          {title}
        </h3>
        <p className="text-sm font-bold ">{category}</p>
        <small className="block">{brand}</small>
        <span className="block">{color}</span>
        <b className="block text-md">{currencyPrice || price}</b>
      </div>
      <div className="flex items-center justify-between">
        <Links
          href={`/product-details/${id}`}
          style="bg-gray-500 w-fit h-[32px] leading-[32px] px-2 rounded-lg text-white tracking-wider capitalize text-sm font-bold"
        >
          more
        </Links>
        <button onClick={handelAddBtn}  className="bg-gray-500 w-fit h-[32px] px-2 rounded-lg text-white tracking-wider capitalize text-sm font-bold">
          add
        </button>
      </div>
    </div>
  );
}

export default WishItem;
