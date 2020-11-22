import React, { useEffect, useRef, useState } from "react";
import Chart from "../chart";
import "./styles.scss";
import configData from "../../config.json";
import Button from "../button";
import { useParams } from "react-router-dom";
import NewsCard from "../news_card";
import TweetsCard from "../tweets_card";
const Stock = (props, ref) => {
  // prevent setting state on component unmounting
  const firstRef = useRef(false);

  const [stockData, setStockData] = useState();
  const [isBusy, setIsBusy] = useState(true);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState(false);
  const { ticker } = useParams();

  useEffect(() => {
    let mounted = true;
    if (ticker === "") return;
    const fetchData = async () => {
      fetch(configData.ENDPOINT + "/get_data/" + ticker, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          if (mounted && !firstRef.current) {
            const tempData = data;
            if ("error" in tempData) {
              setError(true);
            }
            setStockData(data);
            setIsBusy(false);
            firstRef.current = true;
          }
        });
    };
    fetchData();
    return () => (mounted = false);
  }, [ticker]);

  const removeTracker = () => {
    fetch(configData.ENDPOINT + "/remove_tracker/" + ticker, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then(() => {
        setRemoved(true);
      });
  };

  return isBusy ? (
    <div className="stock-loading" ref={ref}>
      LOADING...
    </div>
  ) : error ? (
    <div className="stock-loading" ref={ref}>
      Error: {stockData.error}
    </div>
  ) : (
    <div className="stock" ref={ref}>
      {props.enabled ? "" : ""}
      <Chart prices={stockData.prices} ticker={ticker} />
      <div className="stock-info-box">
        <Button
          className="stock-add"
          maxHeight={"50px"}
          maxWidth={"200px"}
          onClick={() => {
            if (!removed) removeTracker();
          }}
        >
          {removed ? "Removed" : "Remove Ticker"}
        </Button>
        <div className="stock-info">
          <b>Ticker:</b> {stockData.ticker}
        </div>
        <div className="stock-info">
          <b>Name:</b> {stockData.fundamentals.company_name}
        </div>
        <div className="stock-info">
          <b>Industry:</b> {stockData.fundamentals.industry}
        </div>
        <div className="stock-info">
          <b>Sector:</b> {stockData.fundamentals.sector}
        </div>
        <div className="stock-info">
          <b>Market Cap:</b> {stockData.fundamentals.market_cap}
        </div>
        <div className="stock-info">
          <b>Description:</b> {stockData.fundamentals.description}
        </div>
      </div>
      <div className="stock-news">News</div>
      <div className="stock-grid">
        {stockData.news.map((e, i) => (
          <NewsCard key={i} {...e} />
        ))}
      </div>
      <div className="stock-news">Tweets</div>
      <div className="stock-grid">
        {stockData.tweets.map((e, i) => (
          <TweetsCard key={i} {...e} />
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(Stock);
