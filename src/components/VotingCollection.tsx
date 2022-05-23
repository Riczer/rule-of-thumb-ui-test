import { useState, useEffect } from "react";
import { VotingCard } from ".";
import votingInfo from "../../public/data.json";
import { useMediaQuery } from "../hooks";
import { Info } from "../types";

const VotingCollection = () => {
  const [showAs, setShowAs] = useState<"grid" | "list">("grid");
  const [votingData, setVotingData] = useState<Info[]>([]);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!matches) {
      setShowAs("grid");
    }
  }, [matches]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("celebrities") || "{}");
    if (Array.isArray(data)) {
      setVotingData(data);
    } else {
      localStorage.setItem("celebrities", JSON.stringify(votingInfo.data));
    }
  }, []);

  const handleVoting = (name: string, type: "positive" | "negative"): void => {
    setVotingData((prevData) => {
      let data = [...prevData];
      const index = data.findIndex((celebrity) => celebrity.name === name);
      let votes = data[index].votes;
      votes[type] += 1;
      data[index] = { ...data[index], votes };
      localStorage.setItem("celebrities", JSON.stringify(data));
      return data;
    });
  };

  return (
    <div
      className={`voting-collection ${
        showAs === "grid"
          ? "voting-collection--grid"
          : "voting-collection--list"
      }`}
    >
      {votingData.map((info) => (
        <div
          className={`voting-item ${
            showAs === "grid" ? "voting-item--grid" : "voting-item--list"
          }`}
          key={info.name}
        >
          <VotingCard showAs={showAs} info={info} onVote={handleVoting} />
        </div>
      ))}
    </div>
  );
};

export default VotingCollection;
