import React, { useEffect, useState } from "react";
import Chart from "../chart";
import "./styles.scss";
import configData from "../../config.json";
import Button from "../button";
const Stock = (props) => {
  const [stockData, setStockData] = useState();
  const [isBusy, setIsBusy] = useState(true);
  const [removed, setRemoved] = useState(false);
  useEffect(() => {
    if (props.ticker === "") return;
    const fetchData = async () => {
      fetch(configData.ENDPOINT + "/get_data/" + props.ticker, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          setStockData(data);
          setIsBusy(false);
        });
    };
    fetchData();
  }, [props.ticker]);

  const removeTracker = () => {
    fetch(configData.ENDPOINT + "/remove_tracker/" + props.ticker, {
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
    <div className="stock-loading">LOADING...</div>
  ) : (
    <div className="stock">
      <Chart prices={stockData.prices} ticker={props.ticker} />
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
      <div className="stock-info-box">
        <div className="stock-news">News</div>
        {stockData.news.map((e) => (
          <div></div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
