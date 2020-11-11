import React, { useEffect, useState } from "react";
import './styles.scss';
import configData from "../../config.json";

// component for front page of site
const FrontPage = () => {
  // functional states
  const [correlationsDay, setCorrelationsDay] = useState();
  const [correlationsMinute, setCorrelationsMinute] = useState();
  const [correlationsToggle, setCorrelationsToggle] = useState();
  const [gradeDay, setGradeDay] = useState();
  const [gradeMinute, setGradeMinute] = useState();
  const [gradeToggle, setGradeToggle] = useState();
  const [isBusyCorrelationsDay, setIsBusyCorrelationsDay] = useState(true);
  const [isBusyCorrelationsMinute, setIsBusyCorrelationsMinute] = useState(
    true
  );
  const [isBusyGradeDay, setIsBusyGradeDay] = useState(true);
  const [isBusyGradeMinute, setIsBusyGradeMinute] = useState(true);
  
  // data states
  const [spyData, setSpyData] = useState();       // spy data graph
  const [trackers, setTrackers] = useState();     // list of trackers
  const [allTickers, setAllTickers] = useState(); // list of tickers

  // isBusy states
  const [isSpyBusy, setIsSpyBusy] = useState(true);
  const [isBusyTrackers, setIsBusyTrackers] = useState(true);
  const [isBusyTickers, setIsBusyTickers] = useState(true);

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
}