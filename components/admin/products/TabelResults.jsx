import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { storage } from "../../../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
// components
import TableDropdown from "../../../components/dashboard/Dropdowns/TableDropdown";
import TableProductsTbody from "./TableProductsTbody";

export default function TabelResults({
  color = "light",
  product,
  handelDeleteProduct,
  handelUpdateProduct,
}) {


  // useEffect(() => {
  //   if (!Array.isArray(product)) {
  //     [{...product}];
  //   }
  // }, [product]);

  if (product && product.length <= 0) return <div>Products Not Found</div>;
  // if (isLoading) return <div>Loading ...</div>;

  // if (error && error.message) return <div>{error.message}</div>;
  // console.log(product)

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-300 mt-4"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="text-black">
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  title
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  }
                >
                  description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  brand
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  category
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  price
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  stock
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  size
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  color
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Here Loop */}
              {product &&
                product.map((item) => {
                  return (
                    <TableProductsTbody
                      handelDeleteProduct={handelDeleteProduct}
                      key={item._id}
                      item={item}
                      handelUpdateProduct={handelUpdateProduct}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
