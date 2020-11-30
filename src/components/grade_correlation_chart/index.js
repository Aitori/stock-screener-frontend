import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";

const GradeCorrelationChart = () => {
  // data states
  const [correlationsDay, setCorrelationsDay] = useState([]);
  const [correlationsMinute, setCorrelationsMinute] = useState([]);
  const [gradeDay, setGradeDay] = useState([]);
  const [gradeMinute, setGradeMinute] = useState([]);

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
    <div>
      {isBusyCorrelationsDay &&
      isBusyCorrelationsMinute &&
      isBusyGradeDay &&
      isBusyGradeMinute ? (
        <div className="app-loading">Loading...</div>
      ) : (
        <div className="grade-correlation-chart">
          <table>
            <thead>
              <tr>
                <th colSpan="2" className="grade-correlation-chart-title">
                  Minute Correlation
                </th>
              </tr>
              <tr>
                <th>Sector</th>
                <th>Correlation</th>
              </tr>
            </thead>
            <tbody>
              {correlationsMinute.map((e) => (
                <tr key={e.sector}>
                  <td>{e.sector}</td>
                  <td>{e.correlation.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan="2" className="grade-correlation-chart-title">
                  Day Correlation
                </th>
              </tr>
              <tr>
                <th>Sector</th>
                <th>Correlation</th>
              </tr>
            </thead>
            <tbody>
              {correlationsDay.map((e) => (
                <tr key={e.sector}>
                  <td>{e.sector}</td>
                  <td>{e.correlation.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan="3" className="grade-correlation-chart-title">
                  Minute Market Cap Grade
                </th>
              </tr>
              <tr>
                <th>Grade</th>
                <th>Mean</th>
                <th>Standard Deviation</th>
              </tr>
            </thead>
            <tbody>
              {gradeMinute.map((e) => (
                <tr key={e.grade}>
                  <td>{e.grade}</td>
                  <td>
                    {(parseFloat(e.mean_percent_change) * 100).toFixed(1)}‱
                  </td>
                  <td>
                    {(parseFloat(e.std_dev_percent_change) * 100).toFixed(1)}‱
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colSpan="3" className="grade-correlation-chart-title">
                  Day Market Cap Grade
                </th>
              </tr>
              <tr>
                <th>Grade</th>
                <th>Mean</th>
                <th>Standard Deviation</th>
              </tr>
            </thead>
            <tbody>
              {gradeDay.map((e) => (
                <tr key={e.grade}>
                  <td>{e.grade}</td>
                  <td>{parseFloat(e.mean_percent_change).toFixed(1)}%</td>
                  <td>{parseFloat(e.std_dev_percent_change).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GradeCorrelationChart;
