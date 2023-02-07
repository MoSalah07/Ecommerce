import React, { useEffect, useState } from "react";
import Head from "next/head";
import Sidebar from "../../../components/dashboard/Sidebar/Sidebar";
import AdminNavbar from "../../../components/dashboard/Navbars/AdminNavbar.js";
import TabelToolbar from "../../../components/admin/products/TabelToolbar";
import ViewPort from "../../../helper/ViewPort";
import TabelResults from "../../../components/admin/products/TabelResults";
import PopUpProduct from "../../../components/admin/products/PopUpProduct";
import axios from "axios";
import { storage } from "../../../firebase/firebase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import useSWR, { mutate } from "swr";
import EditPopUpProduct from "../../../components/admin/products/EditPopUpProduct";

function Products() {
  const width = ViewPort();
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [defaultEditValue, setDefaultEditValue] = useState({});

  // [1] get Products From MongoDb
  const featcher = async (url) => {
    const { data } = await axios.get(url);
    return data;
  };

  const { data, isLoading, error } = useSWR( "/api/admin/product", featcher );


  // [2]  Send Product To MongoDb  In Component Pop Up Call This Function
  const handelSendProduct = async (filterObject, imgFile) => {
    try {
      // [1] Here Send Data To Mongo Db Without src image
      const { data: newData } = await axios.post(
        `/api/admin/product`,
        filterObject
      );
      const {
        image: { id },
      } = newData;
      // console.log(data)

      // [2] here send src image to firebase
      const storageRef = ref(storage, `${id}/${id}-img`);
      await uploadBytes(storageRef, imgFile["file"]);

      mutate(`/api/admin/product`, [...data, newData]);
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  // [3] Delete Product From MongoDb in Component Call In TabelResults
  const handelDeleteProduct = async (e, id, imageId) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/api/admin/product?id=${id}`);
    } catch (err) {
      console.log(err);
    }

    // Here Delete Image From FireBase
    const imageRef = ref(storage, `${imageId}/${imageId}-img`);
    try {
      deleteObject(imageRef);
    } catch (err) {
      console.log(err);
    }

    const updateData = data && data.filter((el) => el["_id"] !== id);
    mutate("/api/admin/product", [...updateData]);
  };

  // [4] update Product From MongoDb
  const handelUpdateProduct = async (e, id, imageId) => {
    e.preventDefault();
    setShowEditPopup(true);
    try {
      const { data } = await axios.get(`/api/admin/product?id=${id}`);
      setDefaultEditValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Products || Admin Dashboard</title>
      </Head>
      <div className="tabel-product flex flex-col  h-screen relative">
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          {/* For Hidden  */}
          <div className=" hidden md:block">
            <AdminNavbar />
          </div>
        </div>
        <div
          style={{
            width: width >= 768 ? "calc(100% - 16rem)" : "100%",
            height: "calc(100vh - 5.15rem)",
          }}
          className="  absolute md:left-64 top-[5.15rem]"
        >
          {/* Container */}
          <div className="p-4">
            <TabelToolbar
              setShowPopup={setShowPopup}
              title={`Products`}
              titleBtn={`Product`}
            />
            <TabelResults
              product={data}
              handelDeleteProduct={handelDeleteProduct}
              handelUpdateProduct={handelUpdateProduct}
            />
          </div>
        </div>
        {showPopup && (
          <div
            style={{ background: "#0707077a" }}
            className=" overlay absolute z-50  w-full flex  items-center justify-center min-h-screen"
            onClick={(e) => {
              e.stopPropagation();
              if (
                e.target.className.includes("overlay") ||
                e.target.className.includes("tabel-product")
              ) {
                setShowPopup(false);
              }
            }}
          >
            <PopUpProduct handelSendProduct={handelSendProduct} />
          </div>
        )}
        {showEditPopup && (
          <div
            style={{ background: "#0707077a" }}
            onClick={(e) => {
              e.stopPropagation();
              if (
                e.target.className.includes("overlay") ||
                e.target.className.includes("tabel-product")
              ) {
                setShowEditPopup(false);
              }
            }}
            className=" overlay aboslute z-50 w-full flex items-center justify-center h-screen"
          >
            <EditPopUpProduct
              defaultEditValue={defaultEditValue}
              data={data}
              setShowEditPopup={setShowEditPopup}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
