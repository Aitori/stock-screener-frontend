import React, { useRef, useState } from "react";
import "./styles.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

// component imports
import Stock from "../components/stock";
import FrontPage from "../components/front_page";
import NavBar from "../components/nav_bar";

const App = () => {
  const pass = "omegalul";
  const [locked, setLocked] = useState(true);
  const nodeRefFrontPage = useRef(null);
  const nodeRefStock = useRef(null);
  return (
    <Router>
      {locked ? (
        <div className="app-locked">
          <input
            placeholder="Do Not Enter"
            className="app-locked-text"
            type="password"
            onChange={(e) => {
              if (e.target.value === pass) setLocked(false);
            }}
          ></input>
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
