import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../config.json";

// component imports
import Chart from "../components/chart";
import Stock from "../components/stock";
import { CSSTransition } from "react-transition-group";
import TrackerCard from "../components/tracker_card";

const App = () => {
  const [stockData, setStockData] = useState();
  const [allTickers, setAllTickers] = useState();
  const [hoverSearch, setHoverSearch] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [isBusyT, setIsBusyT] = useState(true);
  const [isBusyTrackers, setIsBusyTrackers] = useState(true);
  const [isBusyCorrelationsDay, setIsBusyCorrelationsDay] = useState(true);
  const [isBusyCorrelationsMinute, setIsBusyCorrelationsMinute] = useState(
    true
  );
  const [isBusyGradeDay, setIsBusyGradeDay] = useState(true);
  const [isBusyGradeMinute, setIsBusyGradeMinute] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [currTicker, setCurrTicker] = useState("");
  const [alternate, setAlternate] = useState(false);
  const [trackers, setTrackers] = useState();
  const [spin, setSpin] = useState(false);
  const [correlationsDay, setCorrelationsDay] = useState();
  const [correlationsMinute, setCorrelationsMinute] = useState();
  const [correlationsToggle, setCorrelationsToggle] = useState();
  const [gradeDay, setGradeDay] = useState();
  const [gradeMinute, setGradeMinute] = useState();
  const [gradeToggle, setGradeToggle] = useState();
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

  const fetchCorrelation = async () => {
    fetch(configData.ENDPOINT + "/get_correlations/day", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCorrelationsDay(data.success);
        setIsBusyCorrelationsDay(false);
      });
    fetch(configData.ENDPOINT + "/get_correlations/minute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCorrelationsMinute(data.success);
        setIsBusyCorrelationsMinute(false);
      });
  };

  const fetchGrade = async () => {
    fetch(configData.ENDPOINT + "/get_market_cap_grade_percent_change/day", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setGradeDay(data.success);
        setIsBusyGradeDay(false);
      });
    fetch(configData.ENDPOINT + "/get_market_cap_grade_percent_change/minute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setGradeMinute(data.success);
        setIsBusyGradeMinute(false);
      });
  };

  const addTracker = async (ticker) => {
    fetch(configData.ENDPOINT + "/add_tracker/" + ticker, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then(() => {
        console.log("OP");
        fetchTrackers();
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
    fetchCorrelation();
    fetchTrackers();
    fetchAllTickers();
    fetchData();
    fetchGrade();
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
                  <div key={e} className="app-tracked-list-content-wrapper">
                    <div
                      className="app-tracked-list-content"
                      onClick={() => {
                        setCurrTicker(e);
                        setFilterText("");
                        setAlternate(!alternate);
                      }}
                    >
                      {e}
                    </div>
                    <div
                      className="app-tracked-list-content"
                      onClick={() => {
                        addTracker(e);
                        setFilterText("");
                      }}
                    >
                      +
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "90vh",
          right: "0",
          zIndex: "20",
          color: "#333333",
          fontSize: "5px",
        }}
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
          {isBusyCorrelationsDay && isBusyCorrelationsMinute ? (
            <div className="app-loading">Loading...</div>
          ) : (
            <div className="app-correlation">
              <div
                className="app-toggle-button"
                onClick={() => {
                  setCorrelationsToggle(!correlationsToggle);
                }}
              >
                {!correlationsToggle ? "Minute Correlation" : "Day Correlation"}
              </div>
              {!isBusyCorrelationsDay &&
                correlationsToggle &&
                correlationsDay.map((e) => (
                  <div key={e.sector} className="app-correlation-item">
                    <div className="app-correlation-sector">{e.sector}</div>
                    <div className="app-correlation-percentage">
                      {(parseFloat(e.correlation) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              {!isBusyCorrelationsMinute &&
                !correlationsToggle &&
                correlationsMinute.map((e) => (
                  <div key={e.sector} className="app-correlation-item">
                    <div className="app-correlation-sector">{e.sector}</div>
                    <div className="app-correlation-percentage">
                      {(parseFloat(e.correlation) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
            </div>
          )}
          {isBusyGradeDay && isBusyGradeMinute ? (
            <div className="app-loading">Loading...</div>
          ) : (
            <div className="app-correlation">
              <div
                className="app-toggle-button"
                onClick={() => {
                  setGradeToggle(!gradeToggle);
                }}
              >
                {!gradeToggle
                  ? "Minute Market Cap Grade"
                  : "Day Market Cap Grade"}
              </div>
              {!isBusyGradeDay &&
                gradeToggle &&
                gradeDay.map((e) => (
                  <div key={e.grade} className="app-correlation-item">
                    <div className="app-correlation-sector">
                      Grade: {e.grade}
                    </div>
                    <div className="app-correlation-percentage">
                      Mean:
                      {parseFloat(e.mean_percent_change).toFixed(1)}%
                    </div>
                    <div className="app-correlation-percentage">
                      STDV:
                      {parseFloat(e.std_dev_percent_change).toFixed(1)}%
                    </div>
                  </div>
                ))}
              {!isBusyGradeMinute &&
                !gradeToggle &&
                gradeMinute.map((e) => (
                  <div key={e.grade} className="app-correlation-item">
                    <div className="app-correlation-sector">
                      Grade:{e.grade}
                    </div>
                    <div className="app-correlation-percentage">
                      Mean:
                      {(parseFloat(e.mean_percent_change) * 100).toFixed(1)}‱
                    </div>
                    <div className="app-correlation-percentage">
                      STDV:
                      {(parseFloat(e.std_dev_percent_change) * 100).toFixed(1)}‱
                    </div>
                  </div>
                ))}
            </div>
          )}
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
                <TrackerCard
                  key={e.ticker}
                  onClick={() => setCurrTicker(e.ticker)}
                  {...e}
                />
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
