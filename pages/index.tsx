import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  NavBar,
  MainBanner,
  AboutBanner,
  SuggestionBanner,
  Footer,
} from "../src/components";
import VotingCard from "../src/components/VotingCard";
import votingInfo from "../public/data.json";

const Home: NextPage = () => {
  const [showAs, setShowAs] = useState<"grid" | "list">("list");

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
          <div
            className={`voting-collection ${
              showAs === "grid"
                ? "voting-collection--grid"
                : "voting-collection--list"
            }`}
          >
            {votingInfo.data.map((info, index) => (
              <div
                className={`voting-item ${
                  showAs === "grid" ? "voting-item--grid" : "voting-item--list"
                }`}
              >
                <VotingCard showAs={showAs} info={info} key={index} />
              </div>
            ))}
          </div>
        </main>
        <SuggestionBanner />
        <hr role="separator" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
