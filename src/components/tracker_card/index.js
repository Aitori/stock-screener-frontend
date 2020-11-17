import React, { useEffect, useState } from "react";
import "./styles.scss";
import configData from "../../config.json";
import { useHistory } from "react-router-dom";

const TrackerCard = (props) => {
  const history = useHistory();
  const [notes, setNotes] = useState("");
  const percentage_change = parseFloat(props.percentage_change).toFixed(2);
  const [flash, setFlash] = useState(false);

  useEffect(() => setNotes(props.notes), [props.notes]);

  const updateNotes = async (notes) => {
    fetch(configData.ENDPOINT + "/update_notes/" + props.ticker + "&" + notes, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => flashBorder());
  };

  const flashBorder = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  return (
    <div
      className="tracker-card"
      style={{
        borderColor: `${percentage_change > 0 ? "#62FF52" : "#FF4F4F"}`,
      }}
    >
      <div className="tracker-card-wrapper">
        <div className="tracker-card-ticker">{props.ticker}</div>
        <div>
          <div className="tracker-card-number">${props.close}</div>
          <div className="tracker-card-number">
            {percentage_change > 0 ? "+" : ""}
            {percentage_change}%
          </div>
        </div>
      </div>
      <textarea
        className={`tracker-card-input${flash ? " tracker-card-border" : ""}`}
        placeholder="Notes"
        onChange={(e) => {
          if (e.target.value == null) {
            setNotes("");
          } else {
            setNotes(e.target.value);
          }
        }}
        value={notes ? notes : ""}
        onBlur={() => updateNotes(notes)}
      />
      <div className="tracker-card-click" onClick={() => history.push("/" + props.ticker)} />
      <div className="tracker-card-wrapper">
        <div className="tracker-card-small-text">Open: {` $${props.open}`}</div>
        <div className="tracker-card-small-text">{props.timestamp}</div>
      </div>
    </div>
  );
};

export default TrackerCard;
