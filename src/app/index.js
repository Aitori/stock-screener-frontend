import React, { useRef, useState } from "react";
import "./styles.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import configData from "../config.json";
// component imports
import Stock from "../components/stock";
import FrontPage from "../components/front_page";
import NavBar from "../components/nav_bar";
import { retPass } from "../components/button/obs";

const App = () => {
  const pass = configData.PASS_ONE + retPass(); //
  const [locked, setLocked] = useState(true);
  const [flash, setFlash] = useState(false);
  const nodeRefFrontPage = useRef(null);
  const nodeRefStock = useRef(null);
  const flashWrong = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 10);
  };
  return (
    <Router>
      {locked ? (
        <div className="app-locked">
          <input
            placeholder="Do Not Enter"
            className="app-locked-text"
            type="password"
            onChange={(e) => {
              flashWrong();
              if (e.target.value === pass + "1") setLocked(false);
            }}
          ></input>
          <div className={`wrong${flash ? " flash" : " fade"}`}>WRONG</div>
        </div>
      ) : (
        <div className="app">
          <div className="app-background" />
          <div className="app-navbar">
            <NavBar />
          </div>
          <div className="app-content">
            <Route exact path="/">
              {({ match }) => (
                <CSSTransition
                  nodeRef={nodeRefFrontPage}
                  in={match != null}
                  timeout={1000}
                  classNames="page"
                  unmountOnExit
                >
                  <FrontPage ref={nodeRefFrontPage} />
                </CSSTransition>
              )}
            </Route>
          </div>
          <div className="app-content">
            <Route path="/:ticker">
              {({ match }) => (
                <CSSTransition
                  nodeRef={nodeRefStock}
                  in={match != null}
                  timeout={1000}
                  classNames="page"
                  unmountOnExit
                >
                  <Stock ref={nodeRefStock} key={window.location.pathname} />
                </CSSTransition>
              )}
            </Route>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
