import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../redux/getData/SliceProduct";

function ProductImage({ item: { image: imageSrc, title }, item }) {
  const dispatch = useDispatch();
  const {
    product: { products },
  } = useSelector((state) => state);

  // console.log(products);

  const test = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <div className=" w-full h-full " onClick={() => test(item)}>
      <div className="max-w-[100%] h-full">
        <Image
          src={imageSrc}
          alt={title}
          width={50}
          height={50}
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
}

export default ProductImage;
