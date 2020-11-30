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
  });

  return (
    <div className="query">
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Query</th>
            <th>Postfix</th>
            <th>Tickers</th>
          </tr>
        </thead>
        <tbody>
          {allQueries.map((e) => (
            <tr key={e.query.name}>
              <td className="query-query">{e.query.name}</td>
              <td className="query-query">{e.query.query}</td>
              <td className="query-query">{e.query.postfix}</td>
              <td>
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
