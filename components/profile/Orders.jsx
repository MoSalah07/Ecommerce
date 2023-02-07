import axios from "axios";
import React from "react";
import useSWR from "swr";

function Orders() {
  const fetcher = async (...args) => {
    const { data } = await axios.get(...args);
    return data;
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR("/api/orders/getOrders", fetcher);

//   console.log(orders);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="md:grid md:grid-cols-1 md:gap-4">
        <div className="md:col-span-2 space-y-6 bg-gray-100  px-4 py-5 sm:p-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Orders
            </h3>
            <p className="mt-1 text-sm text-gray-600">Track Your Orders</p>
          </div>
        </div>
        {/* totalWithShipping */}

        {orders && orders?.map((el, idx) => (
          <div
            key={idx}
            className="md:col-span-2 bg-gray-200  px-4 py-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-2"
          >
            <div className=" flex flex-col justify-center items-center basis-[14%] ">
              <span className="text-base">Orders Number</span>
              <p className="text-sm mt-4 font-bold text-gray-700">
                #{el.orderNumber}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[14%] ">
              <span className="text-base">Orders Details</span>
              <p className="text-sm mt-4 font-bold text-gray-700">1</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[10%] ">
              <span className="text-base">Price</span>
              <p className="text-sm mt-4 font-bold text-gray-700">
                {el.totalWithShipping}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[20%] ">
              <span className="text-base">Payment Method</span>
              <p className="text-sm mt-4 font-bold text-gray-700">Paid</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[14%] ">
              <span className="text-base">Dilvery status</span>
              <p className="text-sm mt-4 font-bold text-gray-700">in Process</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[14%] ">
              <span className="text-base">DETAILS</span>
              <p className="text-sm mt-4 font-bold text-gray-700">in Process</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-0 basis-[14%] ">
              <span className="text-base">INVOICE</span>
              <p className="text-sm mt-4 font-bold text-gray-700">in Process</p>
            </div>
          </div>
        ))}
        {/* HEre Completed */}
      </div>
    </div>
  );
}

export default Orders;
