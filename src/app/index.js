import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../config.json";

// component imports
import Chart from "../components/chart";
const App = () => {
  const [stockData, setStockData] = useState();
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "https://cors-anywhere.herokuapp.com/" +
          configData.ENDPOINT +
          "/get_data/spy",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((result) => result.json())
        .then((data) => {
          setStockData(data);
          setIsBusy(false);
        });
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="app-nav">
        <div className="app-title">Stock Screener</div>
        <div className="app-title app-end"> SPY </div>
        <div className="app-tilt">
          <input className="app-search" placeholder="Buffoon search..." />
        </div>
      </div>
      <div className="app-content">
        {!isBusy && <Chart prices={stockData.prices} />}
        <div className="app-tracked-label">Trackers</div>
        <div className="app-tracked">

        </div>
      </div>
    </div>
  );
};

export default App;
