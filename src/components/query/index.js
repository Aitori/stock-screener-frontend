import React, { useState, useEffect } from "react";
import "./styles.scss";
import configData from "../../config.json";
import Button from "../button";

const Query = () => {
  const [allQueries, setAllQueries] = useState([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const fetchLargest = async () => {
    fetch(configData.ENDPOINT + "/execute_all_custom_queries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setAllQueries(data.success);
      })
      .catch((e) => console.log("execute all queries error: " + e));
  };

  const submitQuery = async () => {
    await fetch(
      configData.ENDPOINT + "/add_custom_query/" + name + "/" + query,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await fetchLargest();
  };

  const removeQuery = async (q) => {
    await fetch(configData.ENDPOINT + "/delete_custom_query/" + q, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await fetchLargest();
  };

  useEffect(() => {
    fetchLargest();
  }, []);

  return (
    <div className="query">
      <div>Follow Python Formatting!</div>
      <div className="query-i">
        Data Available in arrays: <br />
        Day Candles -- (o - open), (c - close), (l - low), (h - high), (v -
        volume)
        <br />
        Minute Candles -- (mo - open), (mc - close), (ml - low), (mh - high),
        (mv - volume)
        <br />
        Operators (listed in order of operation): (mean, std), (/, *), (+, -),
        (==, {">="}, {"<="}, {">"}, {"<"}), and, or
        <br />
        Format for mean and std -- [data array] mean [period] [day]
        <br />
        e.g. 'c mean 20 0' = 20-day closing price simple moving average on day 0
        (most recent day)
        <br />
        e.g. 'h std 12 5' = 12-day high price standard deviation on day 5 (5
        days ago)
        <br/>
        <br/>
        Example Query: c[0] {">"} o[0] and c[1] {"<"} o[1] and c[0] {">"} 0.5 * (c std 20 0) + (c mean 20 0)
        <br/>
        The query finds tickers that have closing prices greater than its opening price for the current day, and have closing prices less than the opening price for the previous day. In addition, the closing price today be greater than half a standard deviation from the 20-day simple moving average.
      </div>
      <div className="query-top">
        <input
          className="query-search"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="query-search"
          placeholder="query"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => submitQuery()}>Submit</Button>
      </div>
      <table className="query-table">
        <thead>
          <tr>
            <th className="query-bottom query-right">Name</th>
            <th className="query-bottom query-right">Query</th>
            <th className="query-bottom query-right">Postfix</th>
            <th className="query-bottom query-right">Tickers</th>
            <th className="query-bottom"></th>
          </tr>
        </thead>
        <tbody>
          {allQueries.map((e, i) => (
            <tr
              key={e.query.name}
              className={`${i % 2 === 0 ? " query-odd" : ""}`}
            >
              <td className="query-query query-right">{e.query.name}</td>
              <td className="query-query query-right">{e.query.query}</td>
              <td className="query-query query-right">{e.query.postfix}</td>
              <td className="query-right">
                {e.tickers.map((f, i) => (
                  <span key={f} className="query-tickers">
                    {f}
                    {i === e.tickers.length - 1 ? "" : ", "}
                  </span>
                ))}
              </td>
              <td
                className="query-click"
                onClick={() => {
                  removeQuery(e.query.query);
                }}
              >
                Remove
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Query;
