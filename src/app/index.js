import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../config.json";

// component imports
import Chart from "../components/chart";
const App = () => {
  const [stockData, setStockData] = useState();
  const [allTickers, setAllTickers] = useState();
  const [hoverSearch, setHoverSearch] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [isBusyT, setIsBusyT] = useState(true);
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      fetch(configData.ENDPOINT + "/get_data/spy", {
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
    const fetchAllTickers = async () => {
      fetch(configData.ENDPOINT + "/get_all_tickers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          setAllTickers(data.success);
          setIsBusyT(false);
        });
    };
    fetchAllTickers();
    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="app-nav">
        <div className="app-title">Stock Screener</div>
        <div className="app-title app-end"> SPY </div>
        <div className="app-tilt">
          <input
            value={filterText}
            className="app-search"
            placeholder="Search..."
            onFocus={() => setHoverSearch(true)}
            onBlur={() => setHoverSearch(false)}
            onChange={(e) => {
              if (e.target.value.length < 6)
                setFilterText(e.target.value.toUpperCase());
            }}
          />
          <div
            className={`app-tracked-list${
              !hoverSearch ? " app-tracked-list-content-hidden" : ""
            }`}
          >
            {!isBusyT &&
              allTickers
                .filter((s) => s.includes(filterText))
                .map((e) => (
                  <div key={e} className="app-tracked-list-content">
                    {e}
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="app-content">
        {!isBusy && <Chart prices={stockData.prices} />}
        <div className="app-tracked-label">Trackers</div>
        <div className="app-tracked"></div>
      </div>
    </div>
  );
};

export default App;
