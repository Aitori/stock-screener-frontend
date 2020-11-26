import React from "react";
import "./styles.scss";

const NewsCard = (props) => {
  return (
    <a href={props.url} className="news-card" target="_blank" rel="noreferrer">
      <div className="news-card-title">{props.title}</div>
      <div className="news-card-summary">{props.summary}</div>
    </a>
  );
};

export default NewsCard;
