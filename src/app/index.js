import React from "react";
import "./styles.scss";
// component imports
import Button from "../components/button";
import Chart from "../components/chart";

const App = () => {
  return (
    <div className="app">
      <div className="app-nav">
        <div className="app-title">Stock Screener</div>
        <Button>
          <span style={{ color: "peachpuff" }}>Add Ticker</span>
        </Button>
      </div>
      <div className="app-content">
        <Chart />
      </div>
    </div>
  );
};

export default App;
