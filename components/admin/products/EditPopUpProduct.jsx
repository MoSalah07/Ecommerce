import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ref, deleteObject, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/firebase";

function EditPopUpProduct({ defaultEditValue, setShowEditPopup }) {
  // Status
  const [alldata, setAllData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    brand: "",
    size: "",
    color: "",
    file: {},
  });

  const [imageValue, setImageValue] = useState({});

  const sendEditProduct = async () => {
    const productId = defaultEditValue["_id"];
    try {
      const { data } = await axios.put( `/api/admin/product?id=${ productId }`, alldata );
    
      const imageId = defaultEditValue.image.id;
      const storageRef = ref(storage, `${imageId}/${imageId}-img`);
      if (imageValue) {
        await deleteObject(storageRef);
        await uploadBytes(storageRef, imageValue);
        mutate("/api/admin/product/", { ...alldata, ...defaultEditValue });
      }
      mutate("/api/admin/product/", { ...alldata, ...defaultEditValue });
    } catch (err) {
      console.log(err);
    }
    setShowEditPopup(false);
  };


  // Validation Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getValuesFromInputs = (e) =>
    setAllData({
      ...alldata,
      [e.target.name]:
        e.target.name === "price" || e.target.name === "stock"
          ? Number(e.target.value)
          : e.target.name === "file"
          ? e.target.files[0]
          : e.target.value,
    });

  const filterData = Object.entries(alldata)
    .filter((item) => item[0] !== "file")
    .map((el) => [...el]);
  const filterObject = Object.fromEntries(filterData);

  // Fetch Data By SWR
  const fetcher = async (url) => {
    const { data } = await axios.get(url);
    return data;
  };
  const { data: brands } = useSWR("/api/products/brands", fetcher);
  const { data: catrgories } = useSWR("/api/products/category", fetcher);
  const { data: colors } = useSWR("/api/products/colors", fetcher);

  // For Stop Initial defaultEditValue Empty Object Or undefined
  // You Can See => Default value in select box bracuse avoid initial state undefined
  useEffect(() => {
    setAllData({ ...defaultEditValue });
  }, [defaultEditValue]);

  if (
    Object.keys(defaultEditValue).length === 0 ||
    !brands ||
    !colors ||
    !catrgories
  )
    return;

  return (
    <div className=" tabel-product flex items-center justify-center md:w-[600px] min-h-screen">
      <div className="mx-auto w-full max-w-[550px] overflow-x-auto h-[95vh] bg-white">
        <form
          // onSubmit={(e) => handelSendProduct(e, filterObject, alldata)}
          onSubmit={handleSubmit(sendEditProduct)}
          className="py-6 px-9"
          action="https://formbold.com/s/FORM_ID"
          method="POST"
        >
          <h3 className="text-center mb-4 font-bold text-lg">Edit Product</h3>
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="basis-[48%]">
              <label
                htmlFor="title"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                title
              </label>
              <input
                {...register("title", { required: "Please Write Title" })}
                onChange={getValuesFromInputs}
                // defaultValue={alldata?.title}
                value={alldata?.title || ""}
                type="text"
                name="title"
                id="title"
                placeholder="PS5"
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium 
                text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.title && "border-red-500 focus:border-red-500"
                }`}
              />
              {errors.title && (
                <div className="text-red-500 mt-1">{errors.title.message}</div>
              )}
            </div>
            <div className="basis-[48%]">
              <label
                htmlFor="price"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                price
              </label>
              <input
                {...register("price", { required: "Please Write Price" })}
                onChange={getValuesFromInputs}
                // defaultValue={alldata?.price}
                value={alldata?.price || ""}
                type="number"
                name="price"
                min={0}
                id="price"
                placeholder="$1000"
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.price && "border-red-500 focus:border-red-500"
                }`}
              />
              {errors.price && (
                <div className="text-red-500 mt-1">{errors.price.message}</div>
              )}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="basis-[48%]">
              <label
                htmlFor="title"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                description
              </label>
              <input
                {...register("description", {
                  required: "Please Write Description",
                })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.description}
                value={alldata?.description || ""}
                type="text"
                name="description"
                id="description"
                placeholder="PS5"
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.description && "border-red-500 focus:border-red-500"
                }`}
              />
              {errors.description && (
                <div className="text-red-500 mt-1">
                  {errors.description.message}
                </div>
              )}
            </div>
            <div className="basis-[48%]">
              <label
                htmlFor="category"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                Category
              </label>
              <select
                {...register("category", {
                  required: "Please Write Category",
                })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.category}
                value={alldata?.category || ""}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.category && "border-red-500 focus:border-red-500"
                }`}
                name="category"
                id="category"
              >
                <option value="">Please Enter A Category</option>
                {catrgories &&
                  catrgories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <div className="text-red-500 mt-1">
                  {errors.category.message}
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="basis-[48%]">
              <label
                htmlFor="stock"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                in stock
              </label>
              <input
                {...register("stock", { required: "Please Write Stock" })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.stock}
                value={alldata?.stock || ""}
                type="number"
                name="stock"
                id="stock"
                min={1}
                placeholder="1"
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.stock && "border-red-500 focus:border-red-500"
                }`}
              />
              {errors.stock && (
                <div className="text-red-500 mt-1">{errors.stock.message}</div>
              )}
            </div>
            <div className="basis-[48%]">
              <label
                htmlFor="brand"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                brand
              </label>
              <select
                {...register("brand", { required: "Please Write Brand" })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.stock}
                value={alldata?.brand || ""}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.brand && "border-red-500 focus:border-red-500"
                }`}
                name="brand"
                id="brand"
              >
                <option value="">Please Enter A Brand</option>
                {brands &&
                  brands.map((el, idx) => (
                    <option key={idx} value={el}>
                      {el}
                    </option>
                  ))}
              </select>
              {errors.brand && (
                <div className="text-red-500 mt-1">{errors.brand.message}</div>
              )}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="basis-[48%] capitalize">
              <label
                htmlFor="size"
                className=" mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                size
              </label>
              <select
                {...register("size", { required: "Please Write Size" })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.size}
                value={alldata?.size || ""}
                className={`capitalize w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.size && "border-red-500 focus:border-red-500"
                }`}
                name="size"
                id="size"
              >
                <option value="">Please Enter A Size</option>
                <option value="s">s</option>
                <option value="m">m</option>
                <option value="l">l</option>
                <option value="xl">xl</option>
                <option value="2xl">2xl</option>
                <option value="3xl">3xl</option>
                <option value="4xl">4xl</option>
              </select>
              {errors.size && (
                <div className="text-red-500 mt-1">{errors.size.message}</div>
              )}
            </div>
            <div className="basis-[48%]">
              <label
                htmlFor="color"
                className="mb-2 block text-base font-medium text-[#07074D] capitalize"
              >
                color
              </label>
              <select
                {...register("color", { required: "Please Write Color" })}
                onChange={getValuesFromInputs}
                // defaultValue={defaultEditValue?.color}
                value={alldata?.color || ""}
                className={`capitalize w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                  errors.color && "border-red-500 focus:border-red-500"
                }`}
                name="color"
                id="color"
              >
                <option value="">Please Enter A Color</option>
                {colors &&
                  colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
              </select>
              {errors.color && (
                <div className="text-red-500 mt-1">{errors.color.message}</div>
              )}
            </div>
          </div>

          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload File
            </label>

            <input
              type="file"
              name="flie"
              id="file"
              {...register("image", { required: "Please Enter Image" })}
              // onChange={getValuesFromInputs}
              onChange={(e) => setImageValue(e.target.files[0])}
            />
            {errors.image && (
              <div className="text-red-500 mt-1">{errors.image.message}</div>
            )}
            {/* <div className="mb-8">
                <input
             
                  onChange={getValuesFromInputs}
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                />

              </div> */}
          </div>

          <div>
            <button
              // onClick={(e) => {
              //   setShowPopup(false);
              // }}
              type="submit"
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Send File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPopUpProduct;
