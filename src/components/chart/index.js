import React from "react";
import CanvasJSReact from "../../lib/canvasjs.react";

const Chart = () => {
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    title: {
      text: "AAPL",
    },
    theme: "dark1",
    axisX: {
      gridThickness: 0,
      tickLength: 0,
      interval: 0,
      lineThickness: 0,
      labelFormatter: () => {
        return "";
      },
      crosshair: {
        enabled: true,
        color: "grey",
        snapToDataPoint: true,
      },
    },
    axisY: {
      gridThickness: 0,
      tickLength: 0,
      interval: 0,
      lineThickness: 0,
      labelFormatter: () => {
        return "";
      },
      crosshair: {
        enabled: true,
        color: "grey",
        snapToDataPoint: true,
      },
    },
    data: [
      {
        type: "line",
        dataPoints: [
          { label: "2012", y: 10 },
          { label: "2015", y: 30 },
          { label: "2018", y: 50 },
          { label: "2021", y: 200 },
          { label: "2024", y: 5 },
        ],
      },
    ],
  };
  return <CanvasJSChart options={options} />;
};

export default Chart;
