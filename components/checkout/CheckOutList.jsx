import React, { useState } from "react";
import dynamic from "next/dynamic";
import convertCurrency from "../../lib/convertCurrency";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";

function CheckOutList({
  product,
  product: { price, brand, image, category, title, qty },
}) {
  const [handlerPrice, setHandlerPrice] = useState(0);
  const [show, setShow] = useState(false);

  const {
    currency: { currency },
  } = useSelector((state) => state);

  //handelPrice With Currency
  const handlePrice = async (price, currency) => {
    const priceWithCurrency = await convertCurrency(price, currency);
    setHandlerPrice(priceWithCurrency);
  };

  useEffect(() => {
    handlePrice(price, currency);
    // avoid hydration error
    setShow(true);
  }, [currency, show]);

  return (
    <>
      {show && (
        <div className="flex flex-col justify-center items-center rounded-lg bg-white sm:flex-row border-b-2 w-full">
          <Image
            // className="m-2 h-20 w-20  object-cover object-center flex-1"
            src={image}
            alt="logo"
            width={"80px"}
            height={"80px"}
            priority
          />
          <div className="flex w-full items-center justify-center gap-24 px-4 py-4">
            <div className="flex-col justify-center items-center flex">
              <span className="font-semibold">{title}</span>
              <span className="float-right text-gray-400">{category}</span>
              <p className="text-lg font-bold">{handlerPrice}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Quantity:</span>
                <span className="text-base font-bold">{qty}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// export default dynamic(() => Promise.resolve(CheckOutList), { ssr: false });
export default CheckOutList;
