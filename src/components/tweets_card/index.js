import React from "react";
import "./styles.scss";

const TweetsCard = (props) => {
  return (
      <a
        href={props.url}
        className="tweets-card"
        target="_blank"
        rel="noreferrer"
      >
        <div className="tweets-card-summary">{props.tweet}</div>
      </a>
  );
};

export default TweetsCard;
