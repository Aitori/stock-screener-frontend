import React from "react";
import Chart from "../chart";
import "./styles.scss";

const Stock = (props) => {
  const data = props.data;
  const fundamentals = data.fundamentals;
  return (
    <div className="stock">
      <Chart prices={data.prices} />
      <div className="stock-info-box">
        <div className="stock-info">
          <b>Ticker:</b> {data.ticker}
        </div>
        <div className="stock-info">
          <b>Name:</b> {fundamentals.company_name}
        </div>
        <div className="stock-info">
          <b>Industry:</b> {fundamentals.industry}
        </div>
        <div className="stock-info">
          <b>Sector:</b> {fundamentals.sector}
        </div>
        <div className="stock-info">
          <b>Market Cap:</b> {fundamentals.market_cap}
        </div>
        <div className="stock-info">
          <b>Description:</b> {fundamentals.description}
        </div>
      </div>
    </div>
  );
};

export default Stock;
