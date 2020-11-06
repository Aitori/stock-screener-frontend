import React, { useEffect, useState } from "react";
import Plotly from "plotly.js-finance-dist";
import "./styles.scss";

const timeInts = ["1d", "5d", "1m", "3m", "6m", "1y"];

const Chart = (props) => {
  const [selected, setSelected] = useState("1d");
  const prices = props.prices;
  const priceData = prices[selected];
  useEffect(() => {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    const trace = {
      x: unpack(priceData, "timestamp"),
      close: unpack(priceData, "close"),
      high: unpack(priceData, "high"),
      low: unpack(priceData, "low"),
      open: unpack(priceData, "open"),

      increasing: { line: { color: "#62FF52" } },
      decreasing: { line: { color: "#FF4F4F" } },

      type: "candlestick",
      xaxis: "x",
      yaxis: "y",
    };

    const data = [trace];

    const layout = {
      margin: {
        l: 0,
        r: 0,
        t: 0,
        b: 0,
      },
      plot_bgcolor: "#222222",
      dragmode: "zoom",
      showlegend: false,
      xaxis: {
        showticklabels: false,
        showgrid: false,
        autorange: true,
        rangeslider: {
          visible: false,
        },
      },
      yaxis: {
        showticklabels: false,
        showgrid: false,
        autorange: true,
      },
    };

    var config = {
      responsive: true,
      displayModeBar: false,
    };

    Plotly.newPlot("chart" + props.ticker, data, layout, config);
  });
  return (
    <div className="chart">
      <div id={`chart${props.ticker}`} />
      <div className="chart-buttons">
        {timeInts.map((e) => (
          <div
            key={e}
            className={`chart-button${selected === e ? " chart-selected" : ""}`}
            onClick={() => setSelected(e)}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
