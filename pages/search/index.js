import Aside from "../../components/aside/Aside";
import Content from "../../components/content/Content";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import fetchData from "../../lib/fetchData";
import Footer from "../../components/Footer";
import Layout from "../../components/layout/Layout";

export default function Search({
  data,
  colors,
  categories,
  brands,
  pagination,
}) {
  const router = useRouter();
  const lists = { categories, brands, colors };

  // console.log(pagination);
  return (
    <Layout title="Search">
      <section className="min-h-[65vh] container mx-auto w-full lg:max-w-6xl ">
        <Head></Head>
        <div className="flex md:flex-row flex-col justify-between p-4 h-full gap-4">
          <Aside lists={{ ...lists }} />
          <Content products={data} pagination={pagination} />
        </div>
        {/* <Pagination /> */}
        <Footer pagination={pagination} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  let { category, limited, colors, brand, price, search, sort, page } = query;

  const limitedPage = Number(limited) || 10;

  const { data } = await axios.get(
    `${process.env.VERCEL_URL}/api/products/?category=${
      category || ""
    }&colors=${colors || ""}&brand=${brand || ""}&price=${price || ""}&search=${
      search || ""
    }&limited=${limitedPage}&sort=${sort || "position"}&page=${page}`
  );

  const categories = await fetchData("api/products/category");
  const brands = await fetchData("api/products/brands");
  const allcolors = await fetchData("api/products/colors");
  // console.log(data)
  return {
    props: {
      data: data.filterData || [],
      categories,
      brands,
      colors: allcolors,
      pagination: data.pagination,
    },
  };
}
