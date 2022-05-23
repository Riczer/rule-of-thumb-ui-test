import React, { useState, useEffect } from "react";
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
      setVotingData(votingInfo.data);
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

  const handleChangeView = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setShowAs(value as "grid" | "list");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="voting-collection__title">Previous Rulings</h1>
        <select className="select" value={showAs} onChange={handleChangeView}>
          <option value="list">List</option>
          <option value="grid">Grid</option>
        </select>
      </div>
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
    </div>
  );
};

export default VotingCollection;
