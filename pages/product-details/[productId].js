import React from "react";
import ProductContentDetails from "../../components/content/productDetailsContent/ProductContentDetails";
import ProductImage from "../../components/content/productDetailsContent/ProductImage";
import ProductSell from "../../components/content/productDetailsContent/ProductSell";
import Layout from "../../components/layout/Layout";
import fetchData from "../../lib/fetchData";

export default function ProductDetails({ data, data: { image } }) {

  if (!data) return { notFound: false };
  return (
    <Layout title={data.category}>
      <div className=" min-h-[70vh] container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
        <ProductImage item={data} />
        <ProductContentDetails item={data} />
        {/* <ProductSell /> */}
        {/* {data.title} className='bg-red-500' */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { productId } }) {
  const id = Number(productId);
  const data = await fetchData(`api/products/${id}`);
  return {
    props: {
      data,
    },
  };
}
