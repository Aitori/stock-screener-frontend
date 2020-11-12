import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";
import { Link, useParams } from "react-router-dom";

const NavBar = (props) => {
  // retrieve current ticker from URL
  const { currentTicker } = useParams();
  // list of tickers state data for drop down menu
  const [allTickers, setAllTickers] = useState();
  // busy state for calling API to avoid null allTickers object
  const [isBusyTickers, setIsBusyTickers] = useState(true);
  // state for whether menu of tickers is open
  const [hoverSearch, setHoverSearch] = useState(false);
  // text in search bar for filtering
  const [filterText, setFilterText] = useState("");

  // function to fetch all tickers and put in allTickers state
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
        setIsBusyTickers(false);
      });
  };

  // onComponentMount fetch all tickers
  useEffect(() => {
    fetchAllTickers();
  }, []);

  return (
    <div className="navbar-nav">
      <Link to="/">
        <div
          className={`navbar-title${
            currentTicker === "" ? "" : " navbar-clickable"
          }`}
        >
          {currentTicker === "" ? "Stock Screener" : "Back"}
        </div>
      </Link>
      <div className="navbar-title navbar-end">
        {currentTicker === "" ? "" : currentTicker}
      </div>
      <div className="navbar-tilt">
        <input
          value={filterText}
          className="navbar-search"
          placeholder="Search..."
          onFocus={() => setHoverSearch(true)}
          onBlur={() => setHoverSearch(false)}
          onChange={(e) => {
            if (e.target.value.length < 6)
              setFilterText(e.target.value.toUpperCase());
          }}
        />
        <div
          className={`navbar-tracked-list${
            !hoverSearch ? " navbar-tracked-list-content-hidden" : ""
          }`}
        >
          {isBusyTickers ? (
            <div className="navbar-loading">Loading...</div>
          ) : (
            !isBusyTickers &&
            allTickers
              .filter((s) => s.includes(filterText))
              .map((e) => (
                <div key={e} className="navbar-tracked-list-content-wrnavbarer">
                  <div
                    className="navbar-tracked-list-content"
                    onClick={() => {
                      setFilterText("");
                    }}
                  >
                    {e}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
