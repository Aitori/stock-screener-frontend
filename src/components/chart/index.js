import React from "react";
import CanvasJSReact from "../../lib/canvasjs.react";

const Chart = (props) => {
  let CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const dataPoints =
    props.priceData == null ? [{ x: 0, y: 0 }] : props.priceData;
  const options = {
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
        dataPoints: dataPoints,
      },
    ],
  };
  return <CanvasJSChart options={options} />;
};

export default Chart;
