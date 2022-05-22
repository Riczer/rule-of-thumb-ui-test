import { Info } from "../types";

interface Props {
  showAs: "grid" | "list";
  info: Info;
}

const VotingCard = ({
  showAs,
  info: { name, description, picture },
}: Props) => {
  const handleImage = () => {
    if (showAs === "list") {
      const [name, ext] = picture.split(".");
      return `${name}-small.${ext}`;
    }
    return picture;
  };

  return (
    <div
      className={`voting-card ${
        showAs === "grid" ? "voting-card--grid" : "voting-card--list"
      }`}
    >
      <img src={`img/${handleImage()}`} />
      <img
        src="img/thumbs-up.svg"
        className={`voting-card__status ${
          showAs === "grid"
            ? "voting-card__status--grid"
            : "voting-card__status--list"
        }`}
        style={{ backgroundColor: "rgb(var(--color-green-positive))" }}
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
            1 month ago in Entertainment
          </span>
          <div className="voting-actions">
            <button
              className="voting-actions__button voting-actions__button--positive"
              onClick={() => {}}
            >
              <img src="img/thumbs-up.svg" />
            </button>
            <button
              className="voting-actions__button voting-actions__button--negative"
              onClick={() => {}}
            >
              <img src="img/thumbs-down.svg" />
            </button>
            <button
              className={`voting-actions__cast ${
                showAs === "grid"
                  ? "voting-actions__cast--grid"
                  : "voting-actions__cast--list"
              }`}
            >
              Vote Now
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
          style={{ width: "50%" }}
        >
          <img src="img/thumbs-up.svg" />
          <span
            className={`gauge-bar__ratio ${
              showAs === "grid"
                ? "gauge-bar__ratio--grid"
                : "gauge-bar__ratio--list"
            }`}
          >
            50%
          </span>
        </div>
        <div
          className={`gauge-bar__status ${
            showAs === "grid"
              ? "gauge-bar__status--grid"
              : "gauge-bar__status--list"
          } gauge-bar__status--negative`}
          style={{ width: "50%" }}
        >
          <span
            className={`gauge-bar__ratio ${
              showAs === "grid"
                ? "gauge-bar__ratio--grid"
                : "gauge-bar__ratio--list"
            }`}
          >
            50%
          </span>
          <img src="img/thumbs-down.svg" />
        </div>
      </div>
    </div>
  );
};

export default VotingCard;
