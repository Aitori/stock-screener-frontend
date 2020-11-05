import React, { useEffect } from "react";
import Plotly from "plotly.js-finance-dist";

const Chart = (props) => {
  const prices = props.prices;
  const priceData = prices["1d"];
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
          visible: false
        }
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
  return <div id={`chart${props.ticker}`} />;
};

export default Chart;
