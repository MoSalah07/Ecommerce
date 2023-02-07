import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import WishItem from "./WishItem";
import { removeWishList } from "../../redux/getData/sliceWishList";
import { toast } from "react-toastify";

export default function Wish() {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState([]);

  //  [1] => Get Data From Api And Make Loop In Page Wish Lish
  const handelData = async () => {
    const { data } = await axios.get("/api/user/getWishList");
    setWishList(data.wishList);
  };

  // [2] => Remove Item From Redux And Local Storage And DB
  const removeElement = async (id, item) => {
    const filterd = wishList && wishList.filter((el) => el.id !== id);
    setWishList(filterd);
    // [1] remove Element From Redux And Local Storage
    dispatch(removeWishList(item));

    try {
      // [2] Fetch To DB and Remove Element from DB
      await removeItemFromDb(item); // => Run Function [3]
    } catch (err) {
      console.log(err.message);
    }
    toast.success("Remove From WishList!", {
      position: "top-center",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // [3] => Remove Element From DB And Run Inside Function Number [2]
  async function removeItemFromDb(item) {
    const { data } = await axios.post(`/api/user/removeWishList`, item);
    return data;
  }

  // console.log(wishList)

  // Run Function Get Item Wish List
  useEffect(() => {
    handelData();
  }, []);

  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center min-h-[70vh]">
      <div className="flex flex-col jusitfy-start items-start">
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
            Favourites
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600">
            {wishList && wishList.length} items
          </p>
        </div>
        <div className=" mt-10 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-4">
          {wishList &&
            wishList.map((el) => (
              <WishItem key={el.id} item={el} removeElement={removeElement} />
            ))}
        </div>
      </div>
    </div>
  );
}
