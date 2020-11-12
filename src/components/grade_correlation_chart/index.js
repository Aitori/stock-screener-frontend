import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";

const GradeCorrelationChart = () => {
  // functional states
  const [correlationsToggle, setCorrelationsToggle] = useState();
  const [gradeToggle, setGradeToggle] = useState();

  // data states
  const [correlationsDay, setCorrelationsDay] = useState();
  const [correlationsMinute, setCorrelationsMinute] = useState();
  const [gradeDay, setGradeDay] = useState();
  const [gradeMinute, setGradeMinute] = useState();

  // is busy states
  const [isBusyCorrelationsDay, setIsBusyCorrelationsDay] = useState(true);
  const [isBusyCorrelationsMinute, setIsBusyCorrelationsMinute] = useState(
    true
  );
  const [isBusyGradeDay, setIsBusyGradeDay] = useState(true);
  const [isBusyGradeMinute, setIsBusyGradeMinute] = useState(true);

  const fetchCorrelation = async () => {
    fetch(configData.ENDPOINT + "/get_correlations/day", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCorrelationsDay(data.success);
        setIsBusyCorrelationsDay(false);
      });
    fetch(configData.ENDPOINT + "/get_correlations/minute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCorrelationsMinute(data.success);
        setIsBusyCorrelationsMinute(false);
      });
  };

  const fetchGrade = async () => {
    fetch(configData.ENDPOINT + "/get_market_cap_grade_percent_change/day", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setGradeDay(data.success);
        setIsBusyGradeDay(false);
      });
    fetch(configData.ENDPOINT + "/get_market_cap_grade_percent_change/minute", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setGradeMinute(data.success);
        setIsBusyGradeMinute(false);
      });
  };

  useEffect(() => {
    fetchCorrelation();
    fetchGrade();
  }, []);

  return (
    <div className="grade-correlation-chart">
      {isBusyCorrelationsDay && isBusyCorrelationsMinute ? (
        <div className="app-loading">Loading...</div>
      ) : (
        <div className="grade-correlation-chart">
          <div
            className="grade-correlation-chart-toggle-button"
            onClick={() => {
              setCorrelationsToggle(!correlationsToggle);
            }}
          >
            {!correlationsToggle ? "Minute Correlation" : "Day Correlation"}
          </div>
          {!isBusyCorrelationsDay &&
            correlationsToggle &&
            correlationsDay.map((e) => (
              <div key={e.sector} className="grade-correlation-chart-item">
                <div className="grade-correlation-chart-sector">{e.sector}</div>
                <div className="grade-correlation-chart-percentage">
                  {(parseFloat(e.correlation) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          {!isBusyCorrelationsMinute &&
            !correlationsToggle &&
            correlationsMinute.map((e) => (
              <div key={e.sector} className="grade-correlation-chart-item">
                <div className="grade-correlation-chart-sector">{e.sector}</div>
                <div className="grade-correlation-chart-percentage">
                  {(parseFloat(e.correlation) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
        </div>
      )}
      {isBusyGradeDay && isBusyGradeMinute ? (
        <div className="app-loading">Loading...</div>
      ) : (
        <div className="grade-correlation-chart">
          <div
            className="grade-correlation-chart-toggle-button"
            onClick={() => {
              setGradeToggle(!gradeToggle);
            }}
          >
            {!gradeToggle ? "Minute Market Cap Grade" : "Day Market Cap Grade"}
          </div>
          {!isBusyGradeDay &&
            gradeToggle &&
            gradeDay.map((e) => (
              <div key={e.grade} className="grade-correlation-chart-item">
                <div className="grade-correlation-chart-sector">Grade: {e.grade}</div>
                <div className="grade-correlation-chart-percentage">
                  Mean:
                  {parseFloat(e.mean_percent_change).toFixed(1)}%
                </div>
                <div className="grade-correlation-chart-percentage">
                  STDV:
                  {parseFloat(e.std_dev_percent_change).toFixed(1)}%
                </div>
              </div>
            ))}
          {!isBusyGradeMinute &&
            !gradeToggle &&
            gradeMinute.map((e) => (
              <div key={e.grade} className="grade-correlation-chart-item">
                <div className="grade-correlation-chart-sector">Grade:{e.grade}</div>
                <div className="grade-correlation-chart-percentage">
                  Mean:
                  {(parseFloat(e.mean_percent_change) * 100).toFixed(1)}‱
                </div>
                <div className="grade-correlation-chart-percentage">
                  STDV:
                  {(parseFloat(e.std_dev_percent_change) * 100).toFixed(1)}‱
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GradeCorrelationChart;
