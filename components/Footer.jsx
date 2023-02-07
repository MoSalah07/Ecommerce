import React, { useState } from "react";
import { useRouter } from "next/router";
import { handelPageNavigate } from "../lib/handelPageNavigate";
import axios from "axios";
import { useEffect } from "react";

function Footer({ pagination }) {
  const router = useRouter();



  const getNextPage = async (page) => {
    handelPageNavigate("page", page, router);
  };

  return (
    <div className="flex items-center justify-center py-4">
      {new Array(pagination?.pageCount).fill(0).map((_, idx) => (
        <div
          onClick={() => getNextPage(idx + 1)}
          key={idx}
          className=" py-2 px-3 cursor-pointer hover:opacity-75 bg-gray-800 text-gray-300 text-xs rounded-full w-[30px]"
        >
          {idx + 1}
        </div>
      ))}
    </div>
  );
}

export default Footer;
