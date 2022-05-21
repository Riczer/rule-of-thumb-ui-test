import type { NextPage } from "next";
import Head from "next/head";
import {
  NavBar,
  MainBanner,
  AboutBanner,
  SuggestionBanner,
} from "../src/components";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rule of Thumb</title>
      </Head>
      <NavBar />
      <MainBanner />
      <div className="max-centered">
        <AboutBanner />
        <SuggestionBanner />
      </div>
    </>
  );
};

export default Home;
