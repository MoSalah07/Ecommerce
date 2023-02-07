import React from "react";
import Image from "next/image";
import { storage } from "../../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";

function TableProductsTbody({
  item,
  item: { image },
  handelDeleteProduct,
  handelUpdateProduct,
}) {
  const [imageFromFireStorage, setImageFromFireStorage] = useState("");

  // Get Image From FireBase
  const getImage = async () => {
    if (!image.id) return;

    const srcImage = await getDownloadURL(
      ref(storage, `${image.id}/${image.id}-img`)
    );
    setImageFromFireStorage(srcImage);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <tr key={item._id}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        {item.image && imageFromFireStorage && (
          <Image
            // src={item.image.src}
            src={imageFromFireStorage || "/img/bootstrap.jpg"}
            alt={item.title}
            width={50}
            height={50}
            layout="fixed"
            priority
            objectFit="cover"
          />
        )}

        <span className={"ml-3 font-bold "}>{item.title}</span>
      </th>
      <td className="border-t-0 px-6 align-middle text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.description}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.brand}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.category}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span className="mr-2">{item.price}</span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.stock}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.size}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.color}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <p className="flex items-center justify-between">
          <button
            onClick={(e) => {
              handelUpdateProduct(e, item["_id"], item?.image?.id);
            }}
            className="capitalize bg-green-500 text-white px-3 py-1 text-sm"
          >
            edit
          </button>
          <button
            onClick={(e) => handelDeleteProduct(e, item["_id"], item.image.id)}
            className="capitalize bg-red-500 text-white px-2 py-1 text-sm"
          >
            delete
          </button>
        </p>
      </td>
    </tr>
  );
}

export default TableProductsTbody;
