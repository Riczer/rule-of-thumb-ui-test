import type { NextPage } from "next";
import Head from "next/head";
import {
  NavBar,
  MainBanner,
  AboutBanner,
  SuggestionBanner,
  Footer,
  VotingCollection,
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
        <main role="main">
          <VotingCollection />
        </main>
        <SuggestionBanner />
        <hr role="separator" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
