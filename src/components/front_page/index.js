import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";

import Chart from "../chart";
import TrackerCard from "../tracker_card";
import GradeCorrelationChart from "../grade_correlation_chart";
import LargestEMA from "../largest_ema";
import Query from "../query";

// component for front page of site
const FrontPage = (props, ref) => {
  // data states
  const [spyData, setSpyData] = useState(); // spy data graph
  const [trackers, setTrackers] = useState(); // list of trackers

  // is busy states
  const [isSpyBusy, setIsSpyBusy] = useState(true);
  const [isBusyTrackers, setIsBusyTrackers] = useState(true);

  // fetch call functions
  const fetchTrackers = async () => {
    fetch(configData.ENDPOINT + "/get_trackers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setTrackers(data.tracked);
        setIsBusyTrackers(false);
      });
  };
  const fetchSpyData = async () => {
    fetch(configData.ENDPOINT + "/get_data/spy", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setSpyData(data);
        setIsSpyBusy(false);
      });
  };

  const removeTracker = async (ticker) => {
    await fetch(configData.ENDPOINT + "/remove_tracker/" + ticker, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchTrackers();
  };

  useEffect(() => {
    fetchSpyData();
    fetchTrackers();
  }, []);

  return (
    <div className="front-page" ref={ref}>
      {props.enabled ? "" : ""}
      <div className="front-page-label">Custom User Queries</div>
      <Query />
      <div className="front-page-label">Largest Volume Spikes</div>
      <LargestEMA />
      <div className="front-page-label">Correlation and MC Grades</div>
      <GradeCorrelationChart />
      <div className="front-page-label">SPY Chart</div>
      {isSpyBusy ? (
        <div className="front-page-loading">Loading...</div>
      ) : (
        <Chart prices={spyData.prices} />
      )}
      <div className="front-page-label">Trackers</div>
      <div className="front-page-tracked">
        {isBusyTrackers ? (
          <div className="front-page-loading">Loading...</div>
        ) : (
          !isBusyTrackers &&
          trackers.map((e) => (
            <TrackerCard
              key={e.ticker}
              {...e}
              removeTracker={() => {
                removeTracker(e.ticker);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(FrontPage);
