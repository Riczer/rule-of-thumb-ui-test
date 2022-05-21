import type { NextPage } from "next";
import Head from "next/head";
import { NavBar } from "../src/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rule of Thumb</title>
      </Head>
      <NavBar />
    </>
  );
};

export default Home;
