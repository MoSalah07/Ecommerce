import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ title = "", children }) {
  return (
    <div className="min-h-screen">
      <Head>
        <title>{title && `${title} ||`}  E-Commerce</title>
      </Head>
      <ToastContainer />
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
