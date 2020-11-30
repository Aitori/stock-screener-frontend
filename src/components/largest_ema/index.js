import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";

const LargestEMA = () => {
  const [largest, setLargest] = useState([]);

  const fetchLargest = async () => {
    fetch(configData.ENDPOINT + "/get_largest_emas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setLargest(data.success);
      })
      .catch((e) => console.log("get_largest_emas error: " + e));
  };

  useEffect(() => {
    fetchLargest();
  });
  return (
    <div className="largestema">
      {largest.map((e) => (
        <div key={e.ticker} className="largestema-card">
          <div className="largestema-ticker">{e.ticker}</div>
          <div className="largestema-ema">{e.ema_diff.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default LargestEMA;
