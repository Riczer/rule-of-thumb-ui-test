import { useState, useMemo } from "react";
import { Info } from "../types";
import { differenceInCalendarYears } from "date-fns";

type VoteType = "positive" | "negative";

interface CardProps {
  showAs: "grid" | "list";
  info: Info;
  onVote: (name: string, type: VoteType) => void;
}

interface ButtonProps {
  focused: VoteType | null;
  type: VoteType;
  voted: boolean;
  onCheck: (focus: VoteType) => void;
}

const VOTE_IMAGE = {
  positive: "thumbs-up",
  negative: "thumbs-down",
};

const VoteButton = ({ type, focused, voted, onCheck }: ButtonProps) => {
  return (
    <button
      className={`voting-actions__button voting-actions__button--${type} ${
        focused === type && "voting-actions__button--focus"
      } ${voted && "voting-actions__button--hidden"}`}
      onClick={() => onCheck(type)}
    >
      <img src={`img/${VOTE_IMAGE[type]}.svg`} alt={VOTE_IMAGE[type]} />
    </button>
  );
};

const VotingCard = ({
  showAs,
  info: { name, description, picture, votes, category, lastUpdated },
  onVote,
}: CardProps) => {
  const [focused, setFocused] = useState<VoteType | null>(null);
  const [voted, setVoted] = useState<boolean>(false);

  const handleImage = () => {
    if (showAs === "list") {
      const [name, ext] = picture.split(".");
      return `${name}-small.${ext}`;
    }
    return picture;
  };

  const calcPercentage = (total: number, quantity: number): number => {
    const percentage = (quantity / total) * 100;
    if (Number.isInteger(percentage)) {
      return percentage;
    }
    return Number.parseFloat(percentage.toFixed(1));
  };

  const [positive, negative] = (() => {
    const total = votes.positive + votes.negative;
    const positivePercentage = calcPercentage(total, votes.positive);
    const negativePercentage = calcPercentage(total, votes.negative);
    return [positivePercentage, negativePercentage];
  })();

  const handleVoting = (name: string) => {
    if (focused !== null) {
      onVote(name, focused);
      setFocused(null);
      setVoted(true);
    } else {
      setVoted(false);
    }
  };

  const handleFocus = (focus: VoteType) => {
    setFocused(focus);
  };

  return (
    <div
      className={`voting-card ${
        showAs === "grid" ? "voting-card--grid" : "voting-card--list"
      }`}
    >
      <img src={`img/${handleImage()}`} alt="celebrity" />
      <img
        src={`img/${positive > negative ? "thumbs-up.svg" : "thumbs-down.svg"}`}
        className={`voting-card__status ${
          showAs === "grid"
            ? "voting-card__status--grid"
            : "voting-card__status--list"
        }`}
        style={{
          backgroundColor: `rgb(var(${
            positive > negative
              ? "--color-green-positive"
              : "--color-yellow-negative"
          }))`,
        }}
        alt={positive > negative ? "thumbs-up" : "thumbs-down"}
      />
      <div
        className={`voting-card__container ${
          showAs === "grid"
            ? "voting-card__container--grid"
            : "voting-card__container--list"
        }`}
      >
        <div
          className={`voting-card__content ${
            showAs === "grid"
              ? "voting-card__content--grid"
              : "voting-card__content--list"
          }`}
        >
          <div className="voting-card__info">
            <h1
              className={`voting-card__title ${
                showAs === "grid"
                  ? "voting-card__title--grid"
                  : "voting-card__title--list"
              }`}
            >
              {name}
            </h1>
            <p
              className={`voting-card__description ${
                showAs === "grid"
                  ? "voting-card__description--grid"
                  : "voting-card__description--list"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
        <div
          className={`voting-container ${
            showAs === "grid"
              ? "voting-container--grid"
              : "voting-container--list"
          }`}
        >
          <span
            className={`voting-container__info ${
              showAs === "grid"
                ? "voting-container__info--grid"
                : "voting-container__info--list"
            }`}
          >
            {voted
              ? "Thank you for your vote!"
              : `about ${differenceInCalendarYears(
                  new Date(),
                  new Date(lastUpdated)
                )} year ago in ${
                  category.charAt(0).toUpperCase() + category.slice(1)
                }`}
          </span>
          <div className="voting-actions">
            <VoteButton
              type="positive"
              focused={focused}
              voted={voted}
              onCheck={handleFocus}
            />
            <VoteButton
              type="negative"
              focused={focused}
              voted={voted}
              onCheck={handleFocus}
            />
            <button
              className={`voting-actions__cast ${
                showAs === "grid"
                  ? "voting-actions__cast--grid"
                  : "voting-actions__cast--list"
              }`}
              onClick={() => handleVoting(name)}
            >
              Vote {voted ? "Again" : "Now"}
            </button>
          </div>
        </div>
      </div>
      <div className="gauge-bar">
        <div
          className={`gauge-bar__status ${
            showAs === "grid"
              ? "gauge-bar__status--grid"
              : "gauge-bar__status--list"
          } gauge-bar__status--positive`}
          style={{ width: `${positive}%` }}
        >
          <img src="img/thumbs-up.svg" alt="thumbs-up" />
          <span
            className={`gauge-bar__ratio ${
              showAs === "grid"
                ? "gauge-bar__ratio--grid"
                : "gauge-bar__ratio--list"
            }`}
          >
            {positive}%
          </span>
        </div>
        <div
          className={`gauge-bar__status ${
            showAs === "grid"
              ? "gauge-bar__status--grid"
              : "gauge-bar__status--list"
          } gauge-bar__status--negative`}
          style={{ width: `${negative}%` }}
        >
          <span
            className={`gauge-bar__ratio ${
              showAs === "grid"
                ? "gauge-bar__ratio--grid"
                : "gauge-bar__ratio--list"
            }`}
          >
            {negative}%
          </span>
          <img src="img/thumbs-down.svg" alt="thumbs-down" />
        </div>
      </div>
    </div>
  );
};

export default VotingCard;
