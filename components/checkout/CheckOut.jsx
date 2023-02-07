import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutList from "./CheckOutList";
import { Country, State, City } from "country-state-city";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import convertCurrency from "../../lib/convertCurrency";
import { setInitialState } from "../../redux/getData/SliceProduct";
import { useCreditCardValidator, images } from "react-creditcard-validator";

function CheckOutComponent() {
  // All Array From Redux
  const {
    product: { products },
    currency: { currency },
  } = useSelector((state) => state);



  // Validation From With useForm
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    resetField,
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  // Validation Cradit Card
  function expDateValidate(month, year) {
    if (Number(year) > 2035) {
      return "Expiry Date Year cannot be greater than 2035";
    }
    return;
  }

  const {
    getCardNumberProps,
    getCardImageProps,
    getCVCProps,
    getExpiryDateProps,
    meta: { erroredInputs },
  } = useCreditCardValidator({ expiryDateValidator: expDateValidate });

  // all State
  const [allCountries, setAllCountries] = useState("");
  const [allCountriesName, setAllCountriesName] = useState("");
  const [city, setCity] = useState("");
  const [shipping, setShipping] = useState(0);
  const [shippingNumber, setShippingNumber] = useState(8);
  const [shippingName, setShippingName] = useState("Fedex");
  const [totalWithOutShipping, settotalWithOutShipping] = useState(0);
  const [totalWithOutShippingNumber, settotalWithOutShippingNumber] =
    useState(0);
  const [totalWithShipping, setTotalWithShipping] = useState(0);
  const [totalWithShippingNum, setTotalWithShippingNum] = useState(0);
  const [show, setShow] = useState(false);
  const [shippingT, setShippingT] = useState(8);
  // const [cityError, setCityError] = useState("");
  const [AllErrors, setAllErrors] = useState({
    craditNumberError: "",
    craditCVCError: "",
    craditMonthError: "",
    zipError: "",
    countryError: "",
    cityError: "",
  });

  // Ref
  const formRef = useRef();
  const craditNumber = useRef();
  const craditMonth = useRef();
  const craditCVC = useRef();
  const zip = useRef();
  const router = useRouter().push;

  // Here Get Country Name
  useEffect(() => {
    setAllCountriesName(
      Country.getAllCountries().filter((el) => el.isoCode === allCountries)[0]
        ?.name
    );
  }, [allCountries]);

  // console.log(cityError);

  const { cardHolder, email } = getValues(); // from  useForm Validation inputs

  const {
    craditNumberError,
    craditCVCError,
    craditMonthError,
    zipError,
    countryError,
    cityError,
  } = AllErrors;

  //  Funcion Send Orders To Mongo Db
  const submitHandler = async () => {
    // Validation

    if (!products || products.length === 0) {
      toast.error("Empty list of products");
      return;
    }

    if (!zip?.current || zip?.current?.value === "" || !zip?.current?.value) {
      setAllErrors({
        ...AllErrors,
        zipError: "Please fill input ZIP",
        cityError: "",
        craditNumberError: "",
        craditMonthError: "",
        craditCVCError: "",
      });

      return;
    }

    if (!city || city === "") {
      setAllErrors({
        ...AllErrors,
        cityError: "Please select a City",
        zipError: "",
        craditNumberError: "",
        craditMonthError: "",
        craditCVCError: "",
      });
      return;
    }

    if (
      !craditNumber?.current ||
      craditNumber?.current?.value === "" ||
      !craditNumber?.current?.value
    ) {
      setAllErrors({
        ...AllErrors,
        craditNumberError: "Please enter the visa number",
        zipError: "",
        cityError: "",
        craditMonthError: "",
        craditCVCError: "",
      });

      return;
    }

    if (
      !craditCVC?.current ||
      craditCVC?.current?.value === "" ||
      !craditCVC?.current?.value
    ) {
      setAllErrors({
        ...AllErrors,
        craditNumberError: "",
        zipError: "",
        cityError: "",
        craditMonthError: "",
        craditCVCError: "Please enter CVC",
      });
      return;
    }

    try {
      // Create Object Collecting All Data And Send To Mongo Db With api
      const orderObject = {
        total: totalWithOutShippingNumber,
        cardHolder,
        email,
        totalWithShipping: totalWithShippingNum,
        shipping: shippingNumber,
        shippingName,
        products,
        counrty: allCountriesName,
        city,
        currency: currency || "USD",
        craditNumber: craditNumber?.current?.value,
        craditMonth: craditMonth?.current?.value,
        craditCVC: craditCVC?.current?.value,
        zip: zip?.current?.value,
      };

      const { data } = await axios.post(`/api/orders/acceptOrder`, orderObject);
      if (data.ok) {
        router("/profile?orders=orders");
        localStorage.removeItem("cart");
        dispatch(setInitialState());
        toast.success("Place Order Add Is Successful");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setAllCountriesName("");
    setCity("");
    formRef.current.reset();
  };

  //====================================================== Start Total With Out Shipping and With Shipping

  // Convert Total To Currency
  const handelCurrency = async (price, currency) => {
    const priceConverted = await convertCurrency(price, currency);
    return priceConverted;
  };

  const handelCurrencyShipping = async (price, currency) => {
    const priceConverted = await convertCurrency(price, currency);
    return priceConverted;
  };

  const calcTotal = async () => {
    const totalWithOutShip = products.reduce(
      (acc, cur) => acc + cur.price * cur.qty,
      0
    );

    settotalWithOutShippingNumber(totalWithOutShip);

    const convertedTotalWithOutShip = await handelCurrency(
      totalWithOutShip,
      currency
    );

    const totalWithShip = totalWithOutShip + shippingT;
    setTotalWithShippingNum(totalWithOutShip);
    const convertedTotalWithShipping = await handelCurrencyShipping(
      totalWithShip,
      currency
    );
    settotalWithOutShipping(convertedTotalWithOutShip);
    setTotalWithShipping(convertedTotalWithShipping);

    const convertedShipping = await convertCurrency(shippingT, currency);
    // console.log(convertedShipping)
    setShipping(convertedShipping);
  };

  useEffect(() => {
    calcTotal();
    setShow(true);
  }, [currency, shippingT]);

  // ======================================================= End Total With Out Shipping and With Shipping

  return (
    <>
      <div className="flex flex-col items-center bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {/* Here Get Item From Redux */}
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 overflow-y-auto h-[40vh]">
            {products.map((product) => (
              <CheckOutList key={product.id} product={product} />
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value={8}
                onChange={(e) => {
                  setShippingT(parseInt(e.target.value));
                  setShippingNumber(parseInt(e.target.value));
                  setShippingName(
                    e.target.nextSibling.nextSibling.lastChild.firstChild.textContent.split(
                      " "
                    )[0]
                  );
                }}
                defaultChecked={true}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/img/Fedex.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days With Shipping $8
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                value={20}
                onChange={(e) => {
                  setShippingT(parseInt(e.target.value));
                  setShippingNumber(parseInt(e.target.value));
                  setShippingName(
                    e.target.nextSibling.nextSibling.lastChild.firstChild.textContent.split(
                      " "
                    )[0]
                  );
                }}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/img/dhl.png"
                  alt="notfound"
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">DHL Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days With Shipping $20
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit(submitHandler)}
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
        >
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                {...register("email", {
                  required: "Please Enter Email",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: "Please Enter Valid Email",
                  },
                })}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Email"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            {/* Error Email */}
            {errors.email && (
              <div className="text-red-500 text-sm mt-4">
                {errors.email.message}
              </div>
            )}
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                // onChange={handleOrderChange}
                type="text"
                id="card-holder"
                name="cardHolder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                {...register("cardHolder", {
                  required: "Please Enter Card Holder",
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            {errors.cardHolder && (
              <div className="text-red-500 text-sm mt-4">
                {errors.cardHolder.message}
              </div>
            )}

            {/* Crdit Card */}
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex gap-1">
              <div className="relative w-6/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  {...getCardNumberProps()}
                  ref={craditNumber}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="absolute top-[14px]"
                    {...getCardImageProps({ images })}
                  />
                </div>
                <small className="text-red-600">
                  {erroredInputs.cardNumber && erroredInputs.cardNumber}
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                  ref={craditMonth}
                  {...getExpiryDateProps()}
                />
                <small className="text-red-600">
                  {erroredInputs.expiryDate && erroredInputs.expiryDate}
                </small>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="credit-cvc"
                  className="w-full flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                  {...getCVCProps()}
                  ref={craditCVC}
                />
                <small className="text-red-600">
                  {erroredInputs.cvc && erroredInputs.cvc}
                </small>
              </div>
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row relative">
              {/* Country */}
              <select
                type="text"
                onChange={(e) => {
                  setAllCountries(e.target.value);
                }}
                name="billing-country"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Country</option>
                {Country.getAllCountries().map((el, idx) => (
                  <option key={idx} value={el.isoCode}>
                    {el.name}
                  </option>
                ))}
              </select>
              {/* City */}
              <select
                type="text"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                disabled={!allCountries}
                name="billing-city"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">City</option>
                {City.getCitiesOfCountry(allCountries).map((el, idx) => (
                  <option key={idx} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-[120px] bottom-[-22px] text-xs text-red-500">
                {cityError}
              </span>
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
                ref={zip}
              />
              <span className="absolute right-0 bottom-[-22px] text-xs text-red-500">
                {zipError}
              </span>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {totalWithOutShipping || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">{shipping}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalWithShipping}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}

export default CheckOutComponent;
