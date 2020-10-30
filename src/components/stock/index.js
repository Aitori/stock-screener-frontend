import React from "react";
import Chart from "../chart";
import "./styles.scss";

const Stock = (props) => {
  return (
    <div className="stock">
      <Chart priceData={props.priceData} />
      <div className="stock-info-box">
        <div className="stock-info">
          <b>Ticker:</b> {props.ticker}
        </div>
        <div className="stock-info">
          <b>Name:</b> {props.name}
        </div>
        <div className="stock-info">
          <b>Industry:</b> {props.industry}
        </div>
        <div className="stock-info">
          <b>Sector:</b> {props.sector}
        </div>
        <div className="stock-info">
          <b>Market Cap:</b> {props.market_cap}
        </div>
        <div className="stock-info">
          <b>Description:</b> {props.description}
        </div>
      </div>
    </div>
  );
};

export default Stock;
