import React from "react";
import Head from "next/head";

// components

import CardLineChart from "../../../components/dashboard/Cards/CardLineChart.js";
import CardBarChart from "../../../components/dashboard/Cards/CardBarChart.js";
import CardPageVisits from "../../../components/dashboard/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../../components/dashboard/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "../../../components/layouts-admin-dashboard/Admin";

export default function index() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Admin>
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardLineChart />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>
      </Admin>
    </>
  );
}

index.layout = Admin;
