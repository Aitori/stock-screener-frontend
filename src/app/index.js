import React from "react";
import "./styles.scss";
// component imports
import Button from "../components/button";
import Stock from "../components/stock";
import data from "../tempdata";
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
        {data.map((e) => {
          return <Stock key={e.ticker} {...e}/>;
        })}
      </div>
    </div>
  );
};

export default App;
