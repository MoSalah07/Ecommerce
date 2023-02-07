import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Aside from "../components/aside/Aside";
import Content from "../components/content/Content";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../redux/getData/SliceProduct";
import fetchData from "../lib/fetchData";
import Pagination from "../components/pagination/Pagination";
import axios from "axios";
import Footer from "../components/Footer";
import Layout from "../components/layout/Layout";
import {
  handelPageNavigate,
  removeQueryParam,
} from "./../lib/handelPageNavigate";
import { useRouter } from "next/router";

export default function Home({ data, categories, brands, colors }) {
  const router = useRouter();
  const lists = { categories, brands, colors };
  // console.log(data)

  // useEffect(() => {
  //   handelPageNavigate("page", "1", router);
  // }, []);

  return (
    <Layout>
      <section className="min-h-[65vh] container mx-auto w-full lg:max-w-6xl ">
        <Head></Head>
        <div className="flex md:flex-row flex-col justify-between p-4 h-full gap-4">
          <Aside lists={{ ...lists }} />
          <Content products={data} />
        </div>
        {/* <Pagination /> */}
        <Footer />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await fetchData("api/products");
  const categories = await fetchData("api/products/category");
  const brands = await fetchData("api/products/brands");
  const colors = await fetchData("api/products/colors");
  return {
    props: {
      data,
      categories,
      brands,
      colors,
    },
  };
}
