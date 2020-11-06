import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../config.json";

// component imports
import Chart from "../components/chart";
import Stock from "../components/stock";
import { CSSTransition } from "react-transition-group";

const App = () => {
  const [stockData, setStockData] = useState();
  const [allTickers, setAllTickers] = useState();
  const [hoverSearch, setHoverSearch] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [isBusyT, setIsBusyT] = useState(true);
  const [isBusyTrackers, setIsBusyTrackers] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [currTicker, setCurrTicker] = useState("");
  const [alternate, setAlternate] = useState(false);
  const [trackers, setTrackers] = useState();
  const [spin, setSpin] = useState(false);
  const fetchTrackers = async () => {
    fetch(configData.ENDPOINT + "/get_trackers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setTrackers(data.tracked);
        setIsBusyTrackers(false);
      });
  };

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
          setAllTickers(data.tickers);
          setIsBusyT(false);
        });
    };

    fetchTrackers();
    fetchAllTickers();
    fetchData();
  }, []);

  return (
    <div className={`app${spin ? " spin" : ""}`}>
      <div className="app-nav">
        <div
          className={`app-title${currTicker === "" ? "" : " app-clickable"}`}
          onClick={async () => {
            if (currTicker !== "") {
              setIsBusyTrackers(true);
              fetchTrackers();
              setCurrTicker("");
            }
          }}
        >
          {currTicker === "" ? "Stock Screener" : "Back"}
        </div>
        <div className="app-title app-end">
          {currTicker === "" ? "SPY" : currTicker}
        </div>
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
            {isBusyT ? (
              <div className="app-loading">Loading...</div>
            ) : (
              !isBusyT &&
              allTickers
                .filter((s) => s.includes(filterText))
                .map((e) => (
                  <div
                    key={e}
                    className="app-tracked-list-content"
                    onClick={() => {
                      setCurrTicker(e);
                      setFilterText("");
                      setAlternate(!alternate);
                    }}
                  >
                    {e}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <div
        style={{ position: "absolute", top: "90vh", right: "0", zIndex: "20", color: "#333333", fontSize: "5px"}}
        onClick={() => setSpin(true)}
      >
        albert
      </div>
      <CSSTransition
        in={currTicker === ""}
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <div className={`app-content`}>
          {isBusy ? (
            <div className="app-loading">Loading...</div>
          ) : (
            <Chart prices={stockData.prices} />
          )}
          <div className="app-tracked-label">Trackers</div>
          <div className="app-tracked">
            {isBusyTrackers ? (
              <div className="app-loading">Loading...</div>
            ) : (
              !isBusyTrackers &&
              trackers.map((e) => (
                <div
                  key={e.ticker}
                  className="app-track-item"
                  onClick={() => setCurrTicker(e.ticker)}
                >
                  {e.ticker} | {e.close} | {e.percentage_change}
                </div>
              ))
            )}
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={!(currTicker === "") && !alternate}
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <div className={`app-content`}>
          <Stock ticker={currTicker} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={!(currTicker === "") && alternate}
        timeout={1000}
        classNames="page"
        unmountOnExit
      >
        <div className={`app-content`}>
          <Stock ticker={currTicker} />
        </div>
      </CSSTransition>
      <div className="app-background" />
    </div>
  );
};

export default App;
